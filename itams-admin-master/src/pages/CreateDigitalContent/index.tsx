import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateDigitalContentForm from './CreateDigitalContentForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateDigitalContent(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? 'Digital Content Update'
            : 'Create Digital Content'
        }
        canGoBack
      />
      <CreateDigitalContentForm data={state} action={action} />
    </Box>
  );
}

export default CreateDigitalContent;
