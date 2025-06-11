import { Box } from '@mui/material';
import StatusTable from './StatusTable';
import PageHeader from '../../components/PageHeader';

function AllStatuses() {
  return (
    <Box>
      <PageHeader name="All Statuses" destination="/statuses/create" />
      <StatusTable />
    </Box>
  );
}

export default AllStatuses;
