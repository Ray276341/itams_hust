import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MenuItem as MenuItemInterface } from '../../interface/interface';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NestedList(props: any) {
  const { data } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Box onClick={handleClick}>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          {data.name}
          {open ? <ExpandLess /> : <ExpandMore />}
        </Typography>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.menuList.map((item: MenuItemInterface) => (
            <ListItemButton
              onClick={() => navigate(item.destination)}
              sx={{ pl: 1 }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
