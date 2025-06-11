import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import { visuallyHidden } from "@mui/utils";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import { getPref, Prefs, setPref } from "../../../prefs";
import { ServiceToInventory, Status } from "../../../interface/interface";
import { useAuthContext } from "../../../context/AuthContext";
import { getServiceToInventoryByInventoryId } from "../../../api/inventory";
import { formatDate } from "../../../helpers/format";
import Input from "./Input";
import { getAllStatuses } from "../../../api/status";
import SelectField from "./Select";
import useEditPageReducer, {
  ActionTypes,
} from "../../../reducer/useEditServiceToInventoryReducer";
import useEditServiceToInventoryReducer from "../../../reducer/useEditServiceToInventoryReducer";
import Check from "./Check";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ServiceToInventory;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  // {
  //   id: 'id',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'ID',
  // },
  {
    id: "service_name",
    numeric: false,
    disablePadding: false,
    label: "Service Name",
  },
  {
    id: "service_id",
    numeric: false,
    disablePadding: false,
    label: "Service ID",
  },
  {
    id: "old_cost",
    numeric: false,
    disablePadding: false,
    label: "Old Cost",
  },
  {
    id: "old_status",
    numeric: false,
    disablePadding: false,
    label: "Old Status",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Unit",
  },
  {
    id: "total_unit",
    numeric: false,
    disablePadding: false,
    label: "Total Used",
  },
  {
    id: "estimated_cost",
    numeric: false,
    disablePadding: false,
    label: "Estimate",
  },
  {
    id: "new_cost",
    numeric: false,
    disablePadding: false,
    label: "New Cost",
  },
  {
    id: "new_status",
    numeric: false,
    disablePadding: false,
    label: "New Status",
  },
  {
    id: "check",
    numeric: false,
    disablePadding: false,
    label: "Done",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceToInventory
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    (property: keyof ServiceToInventory) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#FFF !important" }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "700" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface EnhancedTableToolbarProps {
  numSelected: number;
  data: ServiceToInventory[];
  getData: () => void;
  // searchData: (searchText: string) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, data, getData } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                searchData(event.target.value);
              }}
            />
          </Search> */}
          {/* <Tooltip title="Refresh">
            <IconButton onClick={getData}>
              <RefreshIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Export">
            <IconButton>
              <CSVLink
                data={data}
                filename={`service-${dayjs().format("DD-MM-YYYY")}.csv`}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileDownloadIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                </Box>
              </CSVLink>
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}

export default function DetailedInventoryServiceTable(props: any) {
  const { getNotifications } = useAuthContext();
  const { id, initData, getData, statuses, hideDoneColumn } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ServiceToInventory>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    Number(getPref(Prefs.ROWS_PER_PAGE)) === 0
      ? 5
      : Number(getPref(Prefs.ROWS_PER_PAGE))
  );
  const { rows, dispatchEdit } = useEditServiceToInventoryReducer(initData);

  // const searchData = (searchText: string) => {
  //   setRows(
  //     (initRows as ServiceToInventory[]).filter((item: ServiceToInventory) =>
  //       Object.keys(item).some(
  //         (k: string) =>
  //           item[k as keyof ServiceToInventory] != null &&
  //           item[k as keyof ServiceToInventory]
  //             .toString()
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase()),
  //       ),
  //     ),
  //   );
  // };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceToInventory
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = (rows as ServiceToInventory[]).map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPref(Prefs.ROWS_PER_PAGE, event.target.value);
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - (rows as ServiceToInventory[]).length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          data={rows as ServiceToInventory[]}
          getData={getData}
          // searchData={searchData}
        />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              "tr:nth-child(2n+1)": { backgroundColor: "#f8f8f8" },
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={(rows as ServiceToInventory[]).length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(
                rows as ServiceToInventory[],
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell align="left">{row.service_name}</TableCell>
                      <TableCell align="left">{row.service_id}</TableCell>
                      <TableCell align="left">{row.old_cost}</TableCell>
                      <TableCell align="left">{row.old_status}</TableCell>
                      <TableCell align="left">{row.unit}</TableCell>
                      <TableCell align="left">{row.total_unit}</TableCell>
                      <TableCell align="left">{row.estimated_cost}</TableCell>
                      <TableCell align="left">
                        <Input
                          id={row.id}
                          initValue={row.new_cost}
                          required
                          disabled={Boolean(JSON.parse(row.check))}
                          dispatchEdit={dispatchEdit}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <SelectField
                          id={row.id}
                          initValue={
                            statuses.find((status: Status) => {
                              return status.name === row.new_status;
                            })?.id ?? 0
                          }
                          data={statuses}
                          required
                          disabled={Boolean(JSON.parse(row.check))}
                          dispatchEdit={dispatchEdit}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {!hideDoneColumn && (
                          <Check
                            id={row.id}
                            initValue={Boolean(JSON.parse(row.check))}
                            required
                            dispatchEdit={dispatchEdit}
                            item={row}
                            data={statuses}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(rows as ServiceToInventory[]).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
