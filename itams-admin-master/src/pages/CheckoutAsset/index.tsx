import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckoutAssetForm from './CheckoutAssetForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CheckoutAsset(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkout Asset" canGoBack />
      <CheckoutAssetForm data={state} action={action} />
    </Box>
  );
}

export default CheckoutAsset;
