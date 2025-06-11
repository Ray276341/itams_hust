import {
  Typography,
  Box,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../helpers/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialLoginValues = {
    email: '',
    password: '',
  };
  const { getAuth } = useAuthContext();
  const handleSubmit = async (values: any) => {
    try {
      await login(values.email, values.password);
      getAuth();
      navigate('/');
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <Box
      sx={{
        width: '400px',
        background: '#FFF',
        boxShadow: '0px 8px 50px rgba(150, 140, 169, 0.1)',
        padding: '77px 74px',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: 39,
              color: '#000',
            }}
          >
            Sign In
          </Typography>
        </Box>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={loginValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Box sx={{ margin: '10px 0px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#4D4D4D',
                    }}
                  >
                    Username
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    id="email"
                    name="email"
                    error={Boolean(formik.errors.email)}
                    helperText={formik.errors.email}
                    sx={{ marginTop: '5px' }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box sx={{ margin: '10px 0px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#4D4D4D',
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.password)}
                    helperText={formik.errors.password}
                    required
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ marginTop: '5px' }}
                  />
                </Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    background: '#007aff',
                    boxShadow: '0px 8px 25px rgba(114, 56, 207, 0.15)',
                    borderRadius: '10px',
                    marginTop: '15px',
                    marginBottom: '20px',
                    textTransform: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&:hover': {
                      background: '#005eff',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Link
          href="#"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: '#5487F5',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          Forgot your password?
        </Link>
      </Box>
    </Box>
  );
}

export default LoginForm;
