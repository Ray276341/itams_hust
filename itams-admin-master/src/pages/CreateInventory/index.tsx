import { Box } from '@mui/material';
import CreateInventoryForm from './CreateInventoryForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';
import { useLocation } from 'react-router-dom';

function CreateInventory(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE ? 'Inventory Update' : 'Create Inventory'
        }
        canGoBack
      />
      <CreateInventoryForm data={state} action={action} />
    </Box>
  );
}

export default CreateInventory;
