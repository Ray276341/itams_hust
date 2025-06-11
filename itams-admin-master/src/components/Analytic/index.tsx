import { Box, Typography } from '@mui/material';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import { useNavigate } from 'react-router-dom';
export default function Analytic(props: any) {
  const { destination, quantity, type } = props;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        borderRadius: '5px',
        flexGrow: 1,
        alignSelf: 'stretch',
        ':hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate(destination)}
    >
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: '700', fontSize: '40px', color: '#000' }}
          >
            {quantity}
          </Typography>
          <Typography
            sx={{ fontWeight: '400', fontSize: '16px', color: '#8c8c8c' }}
          >
            {`${type}${quantity > 1 ? 's' : ''}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: '0px 0px 5px 5px',
          backgroundColor: '#ABD',
          py: '3px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: '400',
            fontSize: '16px',
            color: '#8c8c8c',
            marginRight: '6px',
          }}
        >
          View All
        </Typography>
        <ArrowCircleRightSharpIcon style={{ fill: 'black' }} fontSize="small" />
      </Box>
    </Box>
  );
}
