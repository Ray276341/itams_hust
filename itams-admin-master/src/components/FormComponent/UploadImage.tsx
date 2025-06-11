import ImageUploading from 'react-images-uploading';
import { Box, Typography, Grid } from '@mui/material';

export function UploadImage(props: any) {
  const { image, onImageChange } = props;

  return (
    <Box sx={{ flexGrow: 1, py: '16px' }}>
      <Grid container spacing={2}>
        <Grid
          xs={3}
          sx={{
            pr: '16px',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', textAlign: 'right' }}>
            Upload Image
          </Typography>
        </Grid>
        <Grid xs={9}>
          <ImageUploading value={image} onChange={onImageChange}>
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              isDragging,
              dragProps,
            }) => (
              <Box>
                <button
                  type="button"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Select image
                </button>
                &nbsp;
                <button
                  type="button"
                  onClick={onImageRemoveAll}
                  style={{ marginBottom: '16px' }}
                >
                  Remove image
                </button>
                {imageList.map((image, index) => (
                  <Box
                    component="img"
                    src={image.dataURL}
                    alt="avatar"
                    sx={{ width: '150px', display: 'flex' }}
                  />
                ))}
              </Box>
            )}
          </ImageUploading>
        </Grid>
      </Grid>
    </Box>
  );
}
