import { Box } from '@mui/material';
import DeprecationTable from './DeprecationTable';
import PageHeader from '../../components/PageHeader';

function AllDeprecations() {
  return (
    <Box>
      <PageHeader name="All Deprecations" destination="/Deprecations/create" />
      <DeprecationTable />
    </Box>
  );
}

export default AllDeprecations;
