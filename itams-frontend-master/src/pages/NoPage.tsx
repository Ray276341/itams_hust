import { Box, Typography } from '@mui/material';

function NoPage() {
  return (
    <Box
      sx={{
        background: '#EEE',
        height: '100vh',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          textColor: '#000',
          fontSize: '30px',
          fontWeight: 700,
        }}
      >
        Oops! Page not found...
      </Typography>
    </Box>
  );
}
export default NoPage;
