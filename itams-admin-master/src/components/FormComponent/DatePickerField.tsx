import * as React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DatePickerField(props: any) {
  const { id, fieldName, disabled, fullWidth, formik, required } = props;
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(formik.values[id]),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    formik.values[id] = newValue;
  };
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              disabled={disabled}
              value={value}
              onChange={handleChange}
              inputFormat="DD/MM/YYYY"
              renderInput={(params: any) => (
                <TextField
                  size="small"
                  {...params}
                  fullWidth={fullWidth}
                  helperText={formik?.errors[id]}
                  error={formik?.errors[id]}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
