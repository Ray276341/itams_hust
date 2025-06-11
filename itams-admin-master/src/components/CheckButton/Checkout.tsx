import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Checkout(props: any) {
  const navigate = useNavigate();
  const { id, path, data } = props;
  const handleClick = () =>
    navigate(`/${path}/${id}/checkout`, { state: data });
  return (
    <Box>
      <Button
        sx={{
          background: '#d81b60',
          borderRadius: '5px',
          textTransform: 'none',
          color: '#FFF',
          fontWeight: 700,
          fontSize: 14,
          '&:hover': {
            background: '#df1f6f',
          },
        }}
        onClick={handleClick}
      >
        Checkout
      </Button>
    </Box>
  );
}
