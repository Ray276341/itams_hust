import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreateCategoryForm from './CreateCategoryForm';
import PageHeader from '../../components/PageHeader';
import { Actions } from '../../interface/interface';

function CreateCategory(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? 'Category Update' : 'Create Category'}
        canGoBack
      />
      <CreateCategoryForm data={state} action={action} />
    </Box>
  );
}

export default CreateCategory;
