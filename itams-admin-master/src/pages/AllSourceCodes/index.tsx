import { Box } from '@mui/material';
import SourceCodeTable from './SourceCodeTable';
import PageHeader from '../../components/PageHeader';

function AllSourceCodes() {
  return (
    <Box>
      <PageHeader name="All Source Codes" destination="/source-code/create" />
      <SourceCodeTable />
    </Box>
  );
}

export default AllSourceCodes;
