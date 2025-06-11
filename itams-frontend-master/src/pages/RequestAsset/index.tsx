import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import RequestAssetTable from './RequestAssetTable';

function RequestAsset() {
  return (
    <Box>
      <PageHeader name="Assets Requested" destination="/request-asset/create" />
      <RequestAssetTable />
    </Box>
  );
}

export default RequestAsset;
