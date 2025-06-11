import { Box } from '@mui/material';
import AssetTable from './AssetTable';
import PageHeader from '../../components/PageHeader';

function MyAssets() {
  return (
    <Box>
      <PageHeader name="All Assets" noButton />
      <AssetTable />
    </Box>
  );
}

export default MyAssets;
