import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteLicense, getLicenseById } from "../../api/license";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { License } from "../../interface/interface";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../helpers/format";

interface HeadCell {
  disablePadding: boolean;
  id: keyof License;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "key",
    numeric: false,
    disablePadding: false,
    label: "Key",
  },
  {
    id: "license_link",
    numeric: false,
    disablePadding: false,
    label: "License Link",
  },
  {
    id: "version",
    numeric: false,
    disablePadding: false,
    label: "Version",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "current_cost",
    numeric: false,
    disablePadding: false,
    label: "Current cost",
  },
  {
    id: "purchase_cost",
    numeric: false,
    disablePadding: false,
    label: "Purchase cost",
  },
  {
    id: "purchase_date",
    numeric: false,
    disablePadding: false,
    label: "Purchase date",
  },
  {
    id: "expiration_date",
    numeric: false,
    disablePadding: false,
    label: "Expiration date",
  },
  {
    id: "seats",
    numeric: false,
    disablePadding: false,
    label: "Seats",
  },
  {
    id: "available",
    numeric: false,
    disablePadding: false,
    label: "Available",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "manufacturer",
    numeric: false,
    disablePadding: false,
    label: "Manufacturer",
  },
  {
    id: "supplier",
    numeric: false,
    disablePadding: false,
    label: "Supplier",
  },
];

export default function LicenseInfo(props: any) {
  const { licenseId } = props;
  const { getNotifications } = useAuthContext();
  const [rows, setRows] = React.useState<License>();

  const [open, setOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState<number>(0);
  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    try {
      const license: License = await getLicenseById(licenseId);
      license.purchase_date = formatDate(license.purchase_date);
      license.expiration_date = formatDate(license.expiration_date);
      console.log(license);
      setRows(license);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteLicense(id);
      handleClose();
      await getData();
      setIdToDelete(0);
      await getNotifications();
      toast.success("Deleted");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              "tr:nth-child(2n+1)": { backgroundColor: "#f8f8f8" },
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableBody>
              {headCells.map((headCell, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={headCell.id}
                  >
                    <TableCell
                      variant="head"
                      align="left"
                      sx={{ fontWeight: "700" }}
                    >
                      {headCell.label}
                    </TableCell>
                    <TableCell align="left">{rows?.[headCell.id]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wish to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDelete(idToDelete)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
