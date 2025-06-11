import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteAsset, getAssetById } from '../../api/asset';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Asset } from '../../interface/interface';
import { useAuthContext } from '../../context/AuthContext';
import { formatDate } from '../../helpers/format';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Asset;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'assetModel',
    numeric: false,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'department',
    numeric: false,
    disablePadding: false,
    label: 'Department',
  },
  {
    id: 'purchase_date',
    numeric: false,
    disablePadding: false,
    label: 'Purchase Date',
  },
  {
    id: 'purchase_cost',
    numeric: false,
    disablePadding: false,
    label: 'Purchase Cost',
  },
  {
    id: 'current_cost',
    numeric: false,
    disablePadding: false,
    label: 'Current Cost',
  },
  {
    id: 'supplier',
    numeric: false,
    disablePadding: false,
    label: 'Supplier',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'User',
  },
];

export default function AssetInfo(props: any) {
  const { assetId } = props;
  const { getNotifications } = useAuthContext();
  const [rows, setRows] = React.useState<Asset>();

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
      const asset: Asset = await getAssetById(assetId);
      asset.purchase_date = formatDate(asset.purchase_date);
      console.log(asset);
      setRows(asset);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAsset(id);
      handleClose();
      await getData();
      setIdToDelete(0);
      await getNotifications();
      toast.success('Deleted');
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              'tr:nth-child(2n+1)': { backgroundColor: '#f8f8f8' },
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
                      sx={{ fontWeight: '700' }}
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
          <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
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
