import { Box } from '@mui/material';
import AssetTable from './AssetTable';
import PageHeader from '../../components/PageHeader';

function AllAssets() {
  return (
    <Box>
      <PageHeader name="All Assets" destination="/hardware/create" />
      <AssetTable />
    </Box>
  );
}

export default AllAssets;
