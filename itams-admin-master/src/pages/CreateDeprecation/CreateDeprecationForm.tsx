import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import { Actions, NewDeprecation, Category } from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../api/category';
import { createNewDeprecation, updateDeprecation } from '../../api/deprecation';
import * as Yup from 'yup';

function CreateDeprecationForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const initialValues: NewDeprecation = {
    name: data?.name ?? '',
    months: data?.months ?? '',
    categoryId:
      categories.find((category: Category) => {
        return category.name === data?.category;
      })?.id ?? 0,
  };
  const validationSchema = Yup.object({
    months: Yup.number()
      .typeError('This value must be a number')
      .integer()
      .typeError('This value must be an integer')
      .min(0, 'This value must be greater than or equal to 0'),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const categories: Category[] = await getAllCategories();
        setCategories(categories);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newDeprecation: NewDeprecation) => {
    setLoading(true);
    try {
      newDeprecation.months = Number(newDeprecation.months);
      if (action === Actions.UPDATE)
        await updateDeprecation(data.id, newDeprecation);
      else await createNewDeprecation(newDeprecation);
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? 'Update successfully'
          : 'Create successfully',
      );
    } catch (err: any) {
      console.log('Create asset', err);
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: { md: '1000px', xs: '100%' },
        background: '#FFF',
        borderRadius: '5px',
        py: '32px',
        margin: 'auto',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <InputField
                  id="name"
                  fieldName="Deprecation Name"
                  fullWidth
                  formik={formik}
                  required
                />
                <InputField
                  id="months"
                  fieldName="Number of Months"
                  fullWidth
                  formik={formik}
                  required
                />
                <SelectField
                  id="categoryId"
                  fieldName="Category"
                  formik={formik}
                  data={categories}
                  required
                />
              </Box>
              <Box
                sx={{
                  mx: '60px',
                  mt: '20px',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <LoadingButton
                  loading={loading}
                  type="submit"
                  sx={{
                    background: '#007aff',
                    boxShadow: '0px 8px 25px rgba(114, 56, 207, 0.15)',
                    borderRadius: '10px',
                    textTransform: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    '&:hover': {
                      background: '#005eff',
                    },
                  }}
                >
                  Save
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default CreateDeprecationForm;
