import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';
import CheckinLicenseForm from './CheckinLicenseForm';

function CheckinLicense(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkin License" canGoBack />
      <CheckinLicenseForm data={state} action={action} />
    </Box>
  );
}

export default CheckinLicense;
