import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import { Actions, NewUser, Department } from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../../api/department';
import { createNewUser, updateUser } from '../../api/user';
import PasswordField from '../../components/FormComponent/PasswordField';
import dayjs from 'dayjs';
import DatePickerField from '../../components/FormComponent/DatePickerField';
import * as Yup from 'yup';

function CreateUserForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const initialValues: NewUser = {
    name: data?.name ?? '',
    username: data?.username ?? '',
    password: '',
    phone: data?.phone ?? '',
    email: data?.email ?? '',
    birthday: data?.birthday ?? dayjs(),
    departmentId:
      departments.find((department: Department) => {
        return department.name === data?.department;
      })?.id ?? 0,
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email'),
    birthday: Yup.date().typeError('Invalid date'),
  });
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

  const handleSubmit = async (newUser: NewUser) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE) await updateUser(data.id, newUser);
      else await createNewUser(newUser);
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
                  fieldName="Name"
                  fullWidth
                  formik={formik}
                />
                <InputField
                  id="username"
                  fieldName="Username"
                  fullWidth
                  formik={formik}
                  autoComplete="off"
                  required
                />
                <PasswordField
                  id="password"
                  fieldName="Password"
                  formik={formik}
                  required={action === Actions.CREATE}
                />
                <InputField id="phone" fieldName="Phone" formik={formik} />
                <InputField
                  id="email"
                  fieldName="Email"
                  formik={formik}
                  required
                />
                <DatePickerField
                  id="birthday"
                  fieldName="Birthday"
                  formik={formik}
                />
                <SelectField
                  id="departmentId"
                  fieldName="Department"
                  formik={formik}
                  data={departments}
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

export default CreateUserForm;
