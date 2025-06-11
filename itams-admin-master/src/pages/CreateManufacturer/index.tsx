import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateManufacturerForm from './CreateMenufacturerForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateManufacturer(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Manufacturer Update'
            : 'Create Manufacturer'
        }
        canGoBack
      />
      <CreateManufacturerForm data={state} action={action} />
    </Box>
  );
}

export default CreateManufacturer;
