import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPasswordValidationSchema } from '../../helpers/validationSchema';
import PasswordField from '../FormComponent/PasswordField';
import { changePassword } from '../../api/auth';

function ChangePasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formik: any) => {
    setLoading(true);
    try {
      const { currentPassword, newPassword } = formik;
      await changePassword(currentPassword, newPassword);
      toast.success('Change password successfully');
    } catch (err: any) {
      console.log('Change password', err);
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: { md: '800px', xs: '100%' },
        background: '#FFF',
        borderRadius: '5px',
        py: '32px',
        margin: 'auto',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <PasswordField
                  id="currentPassword"
                  fieldName="Current password"
                  formik={formik}
                  required
                />
                <PasswordField
                  id="newPassword"
                  fieldName="New password"
                  formik={formik}
                  required
                />
                <PasswordField
                  id="confirmPassword"
                  fieldName="Confirm password"
                  formik={formik}
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

export default ChangePasswordForm;
