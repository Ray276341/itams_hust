import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateAssetModelForm from './CreateAssetModelForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateAssetModel(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Asset Model Update'
            : 'Create Asset Model'
        }
        canGoBack
      />
      <CreateAssetModelForm data={state} action={action} />
    </Box>
  );
}

export default CreateAssetModel;
