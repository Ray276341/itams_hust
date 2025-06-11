import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PageHeader(props: any) {
  const navigate = useNavigate();
  const { name, destination, canGoBack, noButton } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: '16px',
      }}
    >
      <Typography variant="h5">{name}</Typography>
      {!noButton && (
        <Box>
          <Button
            sx={{
              background: '#007aff',
              borderRadius: '5px',
              textTransform: 'none',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 14,
              '&:hover': {
                background: '#005eff',
              },
            }}
            onClick={() => navigate(canGoBack ? -1 : destination)}
          >
            {canGoBack ? 'Back' : 'Create New'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default PageHeader;
