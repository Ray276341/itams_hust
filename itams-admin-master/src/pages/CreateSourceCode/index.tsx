import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateSourceCodeForm from './CreateSourceCodeForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateSourceCode(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Source Code Update'
            : 'Create Source Code'
        }
        canGoBack
      />
      <CreateSourceCodeForm data={state} action={action} />
    </Box>
  );
}

export default CreateSourceCode;
