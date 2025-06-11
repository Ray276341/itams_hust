import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  getOutgoingServiceDependencies,
  getIncomingServiceDependencies,
  deleteServiceDependency,
} from "../../api/serviceDependency";
import { getServiceById } from "../../api/service";
import { ServiceDependency } from "../../interface/interface";
import Actions from "../../components/Actions";
import { toast } from "react-toastify";
import ServiceDependencyDiagram from "./ServiceDependencyDiagram";

const headCells = [
  { id: "id", label: "ID", numeric: false },
  { id: "serviceName", label: "Service", numeric: false },
  { id: "relationshipName", label: "Relationship", numeric: false },
  { id: "note", label: "Note", numeric: false },
] as const;

const columnWidthMap: Record<string, string> = {
  id: "10%",
  serviceName: "30%",
  relationshipName: "30%",
  note: "20%",
  actions: "10%",
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
type Order = "asc" | "desc";
function getComparator<Key extends keyof any>(order: Order, orderBy: Key) {
  return order === "desc"
    ? (a: { [k in Key]: any }, b: { [k in Key]: any }) =>
        descendingComparator(a, b, orderBy)
    : (a: { [k in Key]: any }, b: { [k in Key]: any }) =>
        -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilized = array.map((el, idx) => [el, idx] as [T, number]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (
    e: React.MouseEvent,
    property: keyof ServiceDependency
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof ServiceDependency) => (e: React.MouseEvent) => {
      onRequestSort(e, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#FFF !important" }}>
        <TableCell
          padding="checkbox"
          sx={{
            width: columnWidthMap["id"],
            maxWidth: columnWidthMap["id"],
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: 700,
              width: columnWidthMap[headCell.id],
              maxWidth: columnWidthMap[headCell.id],
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Tooltip title="Sort" arrow>
              <span
                onClick={createSortHandler(headCell.id)}
                style={{ cursor: "pointer", display: "block" }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </span>
            </Tooltip>
          </TableCell>
        ))}

        <TableCell
          sx={{
            fontWeight: 700,
            width: columnWidthMap["actions"],
            maxWidth: columnWidthMap["actions"],
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function ServiceDependencyTable({
  serviceId,
}: {
  serviceId: number;
}) {
  const sid = Number(serviceId);
  const navigate = useNavigate();

  const [service, setService] = React.useState<{ name: string } | null>(null);
  React.useEffect(() => {
    getServiceById(sid).then(setService);
  }, [sid]);

  const useTableState = (
    fetchFn: (id: number) => Promise<ServiceDependency[]>
  ) => {
    const [rows, setRows] = React.useState<ServiceDependency[]>([]);
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof ServiceDependency>("id");
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState<number>(0);

    React.useEffect(() => {
      fetchFn(sid).then(setRows);
    }, [fetchFn, sid]);

    const handleRequestSort = (
      _: React.MouseEvent,
      property: keyof ServiceDependency
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.checked ? rows.map((n) => n.id) : []);
    };

    const handleClick = (_: React.MouseEvent, id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleDelete = async (id: number) => {
      try {
        await deleteServiceDependency(id);
        toast.success("Deleted");
        fetchFn(sid).then(setRows);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Error");
      }
      setOpen(false);
    };

    return {
      rawRows: rows,
      rows: stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      emptyRows,
      open,
      delId,
      rawCount: rows.length,
      handlers: {
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        setOpen,
        setDelId,
        handleDelete,
      },
    };
  };

  const outgoingState = useTableState(getOutgoingServiceDependencies);
  const incomingState = useTableState(getIncomingServiceDependencies);

  const renderTable = (
    state: ReturnType<typeof useTableState>,
    direction: "outgoing" | "incoming"
  ) => (
    <Paper sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          pl: 2,
          pr: 1,
          display: "flex",
          justifyContent: "space-between",
          ...(state.selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {state.selected.length > 0 ? (
          <Typography variant="subtitle1" color="inherit">
            {state.selected.length} selected
          </Typography>
        ) : (
          <Typography variant="h6">
            {direction === "outgoing"
              ? "Outgoing Dependencies"
              : "Incoming Dependencies"}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          {state.selected.length === 0 ? (
            <Button
              sx={{
                background: "#007aff",
                borderRadius: "5px",
                textTransform: "none",
                color: "#FFF",
                fontWeight: 700,
                fontSize: 14,
                "&:hover": { background: "#005eff" },
              }}
              onClick={() =>
                navigate(
                  `/services/${sid}/dependencies/create?direction=${direction}`
                )
              }
            >
              New
            </Button>
          ) : (
            <Tooltip title="Delete">
              <IconButton onClick={() => state.handlers.setOpen(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {state.selected.length === 0 && (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>

      <TableContainer>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <EnhancedTableHead
            numSelected={state.selected.length}
            order={state.order}
            orderBy={state.orderBy}
            onSelectAllClick={state.handlers.handleSelectAllClick}
            onRequestSort={state.handlers.handleRequestSort}
            rowCount={state.rawCount}
          />

          <TableBody>
            {state.rows.map((row) => {
              const isItemSelected = state.selected.includes(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell
                    padding="checkbox"
                    sx={{
                      width: columnWidthMap["id"],
                      maxWidth: columnWidthMap["id"],
                    }}
                  >
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(e) => state.handlers.handleClick(e, row.id)}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      width: columnWidthMap["id"],
                      maxWidth: columnWidthMap["id"],
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.id}
                  </TableCell>

                  <TableCell
                    sx={{
                      width: columnWidthMap["serviceName"],
                      maxWidth: columnWidthMap["serviceName"],
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {direction === "outgoing"
                      ? row.dependencyName
                      : row.serviceName}
                  </TableCell>

                  <TableCell
                    sx={{
                      width: columnWidthMap["relationshipName"],
                      maxWidth: columnWidthMap["relationshipName"],
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.relationshipName}
                  </TableCell>

                  <TableCell
                    sx={{
                      width: columnWidthMap["note"],
                      maxWidth: columnWidthMap["note"],
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.note}
                  </TableCell>

                  <TableCell
                    sx={{
                      width: columnWidthMap["actions"],
                      maxWidth: columnWidthMap["actions"],
                    }}
                  >
                    <Actions
                      id={row.id}
                      path={`services/${sid}/dependencies`}
                      data={row}
                      notClone
                      notUpdate
                      onClickDelete={() => {
                        state.handlers.setDelId(row.id);
                        state.handlers.setOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            {state.emptyRows > 0 && (
              <TableRow style={{ height: 53 * state.emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {state.rawCount === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={state.rawCount}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={state.handlers.handleChangePage}
        onRowsPerPageChange={state.handlers.handleChangeRowsPerPage}
      />

      <Dialog open={state.open} onClose={() => state.handlers.setOpen(false)}>
        <DialogTitle>Delete Dependency?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this dependency record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => state.handlers.setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => state.handlers.handleDelete(state.delId)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      <Box sx={{ flex: "0 0 60%" }}>
        {renderTable(incomingState, "incoming")}
        {renderTable(outgoingState, "outgoing")}
      </Box>

      <Box
        sx={{
          flex: "0 0 40%",
          borderRadius: 1,
          p: 2,
          boxSizing: "border-box",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Dependency Diagram
        </Typography>

        {service && (
          <ServiceDependencyDiagram
            outgoing={outgoingState.rawRows.map((r) => ({
              id: `${r.id}`,
              name: r.dependencyName,
              relationshipName: r.relationshipName,
            }))}
            current={{ id: `svc-${serviceId}`, name: service.name }}
            incoming={incomingState.rawRows.map((r) => ({
              id: `${r.id}`,
              name: r.serviceName,
              relationshipName: r.relationshipName,
            }))}
          />
        )}
      </Box>
    </Box>
  );
}
