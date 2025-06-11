import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckoutSourceCodeForm from './CheckoutSourceCodeForm';
import PageHeader from '../../components/PageHeader';

function CheckoutSourceCode(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkout Source Code" canGoBack />
      <CheckoutSourceCodeForm data={state} action={action} />
    </Box>
  );
}

export default CheckoutSourceCode;
