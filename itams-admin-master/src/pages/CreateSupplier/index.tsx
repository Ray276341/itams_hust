import { Box } from '@mui/material';
import CreateSupplierForm from './CreateSupplierForm';
import { useLocation } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateSupplier(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Supplier Update' : 'Create Supplier'}
        canGoBack
      />
      <CreateSupplierForm data={state} action={action} />
    </Box>
  );
}

export default CreateSupplier;
