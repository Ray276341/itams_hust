import {
  Box,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

function PasswordField(props: any) {
  const { id, fieldName, disabled, fullWidth, formik, required } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1, py: '16px' }}>
      <Grid
        container
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        spacing={2}
      >
        <Grid
          xs={false}
          md={3}
          sx={{
            display: 'flex',
            justifyContent: { md: 'right' },
            alignItems: 'center',
            pr: '16px',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            {required ? `${fieldName}*` : fieldName}
          </Typography>
        </Grid>
        <Grid xs={false} md={9}>
          <TextField
            id={id}
            size="small"
            disabled={disabled}
            fullWidth={fullWidth}
            required={required}
            value={formik.values[id]}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            error={Boolean(formik.errors[id])}
            helperText={formik.errors[id]}
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
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PasswordField;
