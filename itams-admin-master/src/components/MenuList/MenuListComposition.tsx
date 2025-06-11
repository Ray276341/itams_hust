import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuItem as MenuItemInterface } from '../../interface/interface';

export default function MenuListComposition(props: any) {
  const { menuList, name } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
  };

  return (
    <Box onMouseOver={handleOpen} onMouseOut={handleClose}>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{
          my: 2,
          color: 'white',
          display: 'block',
          textTransform: 'capitalize',
        }}
      >
        {name}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {menuList.map((item: MenuItemInterface) => (
                    <MenuItem onClick={() => navigate(item.destination)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
