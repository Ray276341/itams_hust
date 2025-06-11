import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import AssetModelTable from './AssetModelTable';

function AllAssetModels() {
  return (
    <Box>
      <PageHeader name="All Asset Models" destination="/models/create" />
      <AssetModelTable />
    </Box>
  );
}

export default AllAssetModels;
