import { Box, MenuItem, Select, Typography, Grid } from '@mui/material';

function SelectField(props: any) {
  const { id, fieldName, formik, data, required, disabled } = props;
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
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
            {required ? `${fieldName}*` : fieldName}
          </Typography>
        </Grid>
        <Grid xs={false} md={9}>
          <Select
            id={id}
            name={id}
            defaultValue={formik.values[id]}
            value={formik.values[id] === 0 ? '' : formik.values[id]}
            size="small"
            sx={{
              width: '200px',
            }}
            onChange={formik.handleChange}
            required={required}
            disabled={disabled}
          >
            {data?.map((i: any) => {
              return (
                <MenuItem key={i.id} value={i.id}>
                  {`${i.id} - ${i.name}`}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectField;
