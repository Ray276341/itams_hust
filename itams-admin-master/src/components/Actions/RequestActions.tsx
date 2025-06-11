import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RequestActions(props: any) {
  const navigate = useNavigate();
  const { id, path, data, onClickReject } = props;
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Accept request">
        <IconButton
          size="small"
          onClick={() => navigate(`/${path}/${id}/accept`, { state: data })}
          sx={{
            width: '30px',
            height: '30px',
            backgroundColor: '#00c0ef',
            borderRadius: '3px',
            '&:hover': { backgroundColor: '#46b8da' },
          }}
        >
          <CheckIcon
            fontSize="small"
            sx={{ width: '16px', height: '16px', color: '#FFF' }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reject request">
        <IconButton
          size="small"
          onClick={() => onClickReject(+id)}
          sx={{
            width: '30px',
            height: '30px',
            backgroundColor: '#dd4b39',
            borderRadius: '3px',
            '&:hover': { backgroundColor: '#d73925' },
          }}
        >
          <ClearIcon
            fontSize="small"
            sx={{ width: '16px', height: '16px', color: '#FFF' }}
          />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default RequestActions;
