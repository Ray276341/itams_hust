import { Box } from '@mui/material';
import RequestAssetTable from './RequestAssetTable';
import PageHeader from '../../components/PageHeader';

function AllRequestAssets() {
  return (
    <Box>
      <PageHeader name="All Requests" noButton />
      <RequestAssetTable />
    </Box>
  );
}

export default AllRequestAssets;
