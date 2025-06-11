import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateUserForm from './CreateUserForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateUser(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'User Update' : 'Create User'}
        canGoBack
      />
      <CreateUserForm data={state} action={action} />
    </Box>
  );
}

export default CreateUser;
