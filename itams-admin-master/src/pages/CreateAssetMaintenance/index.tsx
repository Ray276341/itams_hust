import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateAssetMaintenanceForm from './CreateAssetMaintenanceForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateAssetMaintenance(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Asset Maintenance Update'
            : 'Create Asset Maintenance'
        }
        canGoBack
      />
      <CreateAssetMaintenanceForm data={state} action={action} />
    </Box>
  );
}

export default CreateAssetMaintenance;
