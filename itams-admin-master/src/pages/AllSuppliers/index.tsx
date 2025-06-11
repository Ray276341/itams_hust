import { Box } from '@mui/material';
import SupplierTable from './SupplierTable';
import PageHeader from '../../components/PageHeader';

function AllSuppliers() {
  return (
    <Box>
      <PageHeader name="All Suppliers" destination="/suppliers/create" />
      <SupplierTable />
    </Box>
  );
}

export default AllSuppliers;
