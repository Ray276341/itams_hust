import { Box } from '@mui/material';
import LicenseTable from './LicenseTable';
import PageHeader from '../../components/PageHeader';

function AllLicenses() {
  return (
    <Box>
      <PageHeader name="Software Licenses" destination="/licenses/create" />
      <LicenseTable />
    </Box>
  );
}

export default AllLicenses;
