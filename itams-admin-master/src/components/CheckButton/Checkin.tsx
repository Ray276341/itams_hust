import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Checkin(props: any) {
  const navigate = useNavigate();
  const { id, path, data } = props;
  const handleClick = () => navigate(`/${path}/${id}/checkin`, { state: data });
  return (
    <Box>
      <Button
        sx={{
          background: '#605ca8',
          borderRadius: '5px',
          textTransform: 'none',
          color: '#FFF',
          fontWeight: 700,
          fontSize: 14,
          '&:hover': {
            background: '#6f5faf',
          },
        }}
        onClick={handleClick}
      >
        Checkin
      </Button>
    </Box>
  );
}
