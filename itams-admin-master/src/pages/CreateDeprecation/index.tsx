import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateDeprecationForm from './CreateDeprecationForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateDeprecation(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Deprecation Update'
            : 'Create Deprecation'
        }
        canGoBack
      />
      <CreateDeprecationForm data={state} action={action} />
    </Box>
  );
}

export default CreateDeprecation;
