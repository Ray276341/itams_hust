import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateLocationForm from './CreateLocationForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateLocation(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Location Update' : 'Create Location'}
        canGoBack
      />
      <CreateLocationForm data={state} action={action} />
    </Box>
  );
}

export default CreateLocation;
