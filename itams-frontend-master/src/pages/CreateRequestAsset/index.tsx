import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateRequestAssetForm from './CreateRequestAssetForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateRequestAsset(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Asset Update' : 'Create Request'}
        canGoBack
      />
      <CreateRequestAssetForm data={state} action={action} />
    </Box>
  );
}

export default CreateRequestAsset;
