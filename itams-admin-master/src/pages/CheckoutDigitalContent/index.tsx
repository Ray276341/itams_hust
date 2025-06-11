import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckoutDigitalContentForm from './CheckoutDigitalContentForm';
import PageHeader from '../../components/PageHeader';

function CheckoutDigitalContent(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkout Digital Content" canGoBack />
      <CheckoutDigitalContentForm data={state} action={action} />
    </Box>
  );
}

export default CheckoutDigitalContent;
