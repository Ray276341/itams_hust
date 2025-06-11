import * as React from 'react';
import { Box, Checkbox, Typography, Grid } from '@mui/material';

function CheckboxField(props: any) {
  const { id, fieldName, disabled, formik, required } = props;
  const [checked, setChecked] = React.useState(formik.values[id]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    formik.values[id] = event.target.checked;
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
          <Checkbox
            id={id}
            size="small"
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
            required={required}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckboxField;
