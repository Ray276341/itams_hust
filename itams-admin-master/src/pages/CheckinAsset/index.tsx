import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckinAssetForm from './CheckinAssetForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CheckinAsset(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkin Asset" canGoBack />
      <CheckinAssetForm data={state} action={action} />
    </Box>
  );
}

export default CheckinAsset;
