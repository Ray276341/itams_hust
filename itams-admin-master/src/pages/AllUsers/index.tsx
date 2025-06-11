import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import UserTable from './UserTable';

function AllUsers() {
  return (
    <Box>
      <PageHeader name="Current Users" destination="/users/create" />
      <UserTable />
    </Box>
  );
}

export default AllUsers;
