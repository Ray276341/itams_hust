import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateDepartmentForm from './CreateDepartmentForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateDepartment(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE ? 'Department Update' : 'Create Department'
        }
        canGoBack
      />
      <CreateDepartmentForm data={state} action={action} />
    </Box>
  );
}

export default CreateDepartment;
