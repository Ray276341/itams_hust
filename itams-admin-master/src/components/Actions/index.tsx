import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';

function Actions(props: any) {
  const navigate = useNavigate();
  const { id, path, data, onClickDelete, notClone, notUpdate, notDelete } =
    props;
  return (
    <Stack direction="row" spacing={1}>
      {!notClone && (
        <Tooltip title="Clone Item">
          <IconButton
            size="small"
            onClick={() => navigate(`/${path}/${id}/clone`, { state: data })}
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: '#00c0ef',
              borderRadius: '3px',
              '&:hover': { backgroundColor: '#46b8da' },
            }}
          >
            <ContentCopyIcon
              fontSize="small"
              sx={{ width: '16px', height: '16px', color: '#FFF' }}
            />
          </IconButton>
        </Tooltip>
      )}
      {!notUpdate && (
        <Tooltip title="Update">
          <IconButton
            size="small"
            onClick={() => navigate(`/${path}/${id}/edit`, { state: data })}
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: '#f39c12',
              borderRadius: '3px',
              '&:hover': { backgroundColor: '#e08e0b' },
            }}
          >
            <EditIcon
              fontSize="small"
              sx={{ width: '16px', height: '16px', color: '#FFF' }}
            />
          </IconButton>
        </Tooltip>
      )}
      {!notDelete && (
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => onClickDelete(+id)}
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: '#dd4b39',
              borderRadius: '3px',
              '&:hover': { backgroundColor: '#d73925' },
            }}
          >
            <DeleteIcon
              fontSize="small"
              sx={{ width: '16px', height: '16px', color: '#FFF' }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

export default Actions;
