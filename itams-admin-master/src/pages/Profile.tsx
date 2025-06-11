import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import ProfileForm from '../components/ProfileForm';

function Profile() {
  return (
    <Box>
      <PageHeader name="Edit Your Profile" noButton />
      <ProfileForm />
    </Box>
  );
}

export default Profile;
