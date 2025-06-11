import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: '#EEE',
        width: '100vw',
        height: '100vh',
      }}
    >
      <LoginForm />
    </Box>
  );
}

export default Login;
