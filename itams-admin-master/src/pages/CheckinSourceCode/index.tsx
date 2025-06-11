import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';
import CheckinSourceCodeForm from './CheckinSourceCodeForm';

function CheckinSourceCode(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkin Source Code" canGoBack />
      <CheckinSourceCodeForm data={state} action={action} />
    </Box>
  );
}

export default CheckinSourceCode;
