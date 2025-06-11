import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateLicenseForm from './CreateLicenseForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateLicense(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'License Update' : 'Create License'}
        canGoBack
      />
      <CreateLicenseForm data={state} action={action} />
    </Box>
  );
}

export default CreateLicense;
