import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import CheckinDigitalContentForm from './CheckinDigitalContentForm';

function CheckinDigitalContent(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkin Digital Content" canGoBack />
      <CheckinDigitalContentForm data={state} action={action} />
    </Box>
  );
}

export default CheckinDigitalContent;
