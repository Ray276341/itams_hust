import { Box } from '@mui/material';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PageHeader from '../components/PageHeader';

function ChangePassword() {
  return (
    <Box>
      <PageHeader name="Change Password" noButton />
      <ChangePasswordForm />
    </Box>
  );
}

export default ChangePassword;
