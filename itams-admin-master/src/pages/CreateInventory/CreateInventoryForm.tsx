import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import {
  Actions,
  NewInventory,
  Department,
  Supplier,
} from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../../api/department';
import { createNewInventory, updateInventory } from '../../api/inventory';
import DatePickerField from '../../components/FormComponent/DatePickerField';
import dayjs from 'dayjs';

function CreateInventoryForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const initialValues: NewInventory = {
    name: data?.name ?? '',
    start_date: data?.start_date ?? dayjs(),
    end_date: data?.end_date ?? '',
    note: data?.note ?? '',
    departmentId:
      departments.find((department: Department) => {
        return department.name === data?.department;
      })?.id ?? 0,
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const departments: Department[] = await getAllDepartments();
        setDepartments(departments);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newInventory: NewInventory) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE)
        await updateInventory(data.id, newInventory);
      else await createNewInventory(newInventory);
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? 'Update successfully'
          : 'Create successfully',
      );
    } catch (err: any) {
      console.log('Create inventory', err);
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
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <InputField
                  id="name"
                  fieldName="Name"
                  formik={formik}
                  required
                  fullWidth
                />
                <SelectField
                  id="departmentId"
                  fieldName="Department"
                  formik={formik}
                  data={departments}
                  required
                  disabled={action === Actions.UPDATE}
                />
                <DatePickerField
                  id="start_date"
                  fieldName="Start Date"
                  formik={formik}
                  required
                />
                <DatePickerField
                  id="end_date"
                  fieldName="End Date"
                  formik={formik}
                />
                <InputField
                  id="note"
                  fieldName="Note"
                  formik={formik}
                  multiline
                  fullWidth
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

export default CreateInventoryForm;
