import * as React from 'react';
import { Box, Typography, Grid, ClickAwayListener } from '@mui/material';
import { SketchPicker } from 'react-color';

export default function ColorPickerField(props: any) {
  const { id, fieldName, disabled, fullWidth, formik, required } = props;
  const [value, setValue] = React.useState<string>(formik.values[id]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (newValue: string) => {
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
        <Grid xs={false} md={1}>
          {open && (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box>
                <SketchPicker
                  color={value}
                  onChange={({ hex }) => handleChange(hex)}
                />
              </Box>
            </ClickAwayListener>
          )}
          {!open && (
            // <Box>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                backgroundColor: value,
                borderRadius: '50%',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => setOpen(true)}
            ></Box>
            // </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
