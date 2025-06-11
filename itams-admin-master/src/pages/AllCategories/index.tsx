import { Box } from '@mui/material';
import CategoryTable from './CategoryTable';
import PageHeader from '../../components/PageHeader';

function AllCategories() {
  return (
    <Box>
      <PageHeader name="All Categories" destination="/categories/create" />
      <CategoryTable />
    </Box>
  );
}

export default AllCategories;
