import { Box } from '@mui/material';
import ManufacturerTable from './ManufacturerTable';
import PageHeader from '../../components/PageHeader';

function AllManufacturers() {
  return (
    <Box>
      <PageHeader
        name="All Manufacturers"
        destination="/manufacturers/create"
      />
      <ManufacturerTable />
    </Box>
  );
}

export default AllManufacturers;
