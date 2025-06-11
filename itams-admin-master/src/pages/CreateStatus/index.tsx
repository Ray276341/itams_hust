import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateStatusForm from './CreateStatusForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateStatus(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Status Update' : 'Create Status'}
        canGoBack
      />
      <CreateStatusForm data={state} action={action} />
    </Box>
  );
}

export default CreateStatus;
