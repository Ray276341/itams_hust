import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import AssetMaintenanceTable from './AssetMaintenanceTable';

function AllAssetMaintenances() {
  return (
    <Box>
      <PageHeader
        name="All Asset Maintenances"
        destination="/maintenances/create"
      />
      <AssetMaintenanceTable />
    </Box>
  );
}

export default AllAssetMaintenances;
