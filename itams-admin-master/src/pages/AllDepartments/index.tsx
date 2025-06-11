import { Box } from '@mui/material';
import DepartmentTable from './DepartmentTable';
import PageHeader from '../../components/PageHeader';

function AllDepartments() {
  return (
    <Box>
      <PageHeader name="All Departments" destination="/departments/create" />
      <DepartmentTable />
    </Box>
  );
}

export default AllDepartments;
