import { Box } from '@mui/material';
import LocationTable from './LocationTable';
import PageHeader from '../../components/PageHeader';

function AllLocations() {
  return (
    <Box>
      <PageHeader name="All Locations" destination="/locations/create" />
      <LocationTable />
    </Box>
  );
}

export default AllLocations;
