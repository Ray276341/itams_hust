import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckoutLicenseForm from './CheckoutLicenseForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CheckoutLicense(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkout License" canGoBack />
      <CheckoutLicenseForm data={state} action={action} />
    </Box>
  );
}

export default CheckoutLicense;
