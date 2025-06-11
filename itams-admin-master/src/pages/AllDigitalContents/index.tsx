import { Box } from '@mui/material';
import DigitalContentTable from './DigitalContentTable';
import PageHeader from '../../components/PageHeader';

function AllDigitalContents() {
  return (
    <Box>
      <PageHeader
        name="All Digital Contents"
        destination="/digital-content/create"
      />
      <DigitalContentTable />
    </Box>
  );
}

export default AllDigitalContents;
