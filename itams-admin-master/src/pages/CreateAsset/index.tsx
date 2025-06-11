import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateAssetForm from './CreateAssetForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateAsset(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Asset Update' : 'Create Asset'}
        canGoBack
      />
      <CreateAssetForm data={state} action={action} />
    </Box>
  );
}

export default CreateAsset;
