import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MenuListComposition from "../MenuList/MenuListComposition";
import { MenuItem as MenuItemInterface } from "../../interface/interface";
import Notification from "./Notification";
import NestedList from "../MenuList/NestedList";
interface Page {
  name: string;
  hasChild: boolean;
  destination?: string;
  menuList?: MenuItemInterface[];
}
const pages: Page[] = [
  { name: "Dashboard", destination: "/", hasChild: false },
  {
    name: "Assets",
    destination: "/hardware",
    hasChild: true,
    menuList: [
      { name: "List All", destination: "/hardware" },
      { name: "All Requests", destination: "request-assets" },
      { name: "Asset Maintenances", destination: "maintenances" },
      { name: "Deleted Assets", destination: "/hardware/deleted" },
    ],
  },
  { name: "Source codes", destination: "/source-code", hasChild: false },
  {
    name: "Digital contents",
    destination: "/digital-content",
    hasChild: false,
  },
  { name: "Licenses", destination: "/licenses", hasChild: false },
  //{ name: "Services", destination: "/services", hasChild: false },
  {
    name: "Services",
    destination: "/services",
    hasChild: true,
    menuList: [
      { name: "List All", destination: "/services" },
      { name: "All Requests", destination: "request-services" },
    ],
  },
  { name: "People", destination: "/users", hasChild: false },
  {
    name: "Import",
    hasChild: true,
    menuList: [
      { name: "Assets", destination: "/import/asset" },
      { name: "Users", destination: "/import/user" },
    ],
  },
  { name: "Inventory", destination: "/inventory", hasChild: false },
  {
    name: "Settings",
    hasChild: true,
    menuList: [
      { name: "Statuses", destination: "/statuses" },
      { name: "Asset Models", destination: "/models" },
      { name: "Categories", destination: "/categories" },
      { name: "Service Types", destination: "/serviceTypes" },
      { name: "Relationships", destination: "/relationships" },
      { name: "Manufacturers", destination: "/manufacturers" },
      { name: "Suppliers", destination: "/suppliers" },
      { name: "Departments", destination: "/departments" },
      { name: "Locations", destination: "/locations" },
      { name: "Deprecations", destination: "/deprecations" },
    ],
  },
];
const settings: MenuItemInterface[] = [
  { name: "Edit Your Profile", destination: "/account/profile" },
  { name: "Change Password", destination: "/account/password" },
  { name: "Logout", destination: "/login" },
];

const Header = () => {
  const navigate = useNavigate();
  const { getAuth, authContext } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenu = async (destination: string) => {
    handleCloseUserMenu();
    switch (destination) {
      case "/login":
        try {
          await logout();
          getAuth();
          navigate("/login");
        } catch (err: any) {
          console.log(err);
          toast.error(err.response.data.message);
        }
        return;
      default:
        navigate(destination);
        return;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ITAMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: Page) => (
                <MenuItem
                  key={page.name}
                  disableRipple={page.hasChild ? true : false}
                >
                  {page.hasChild ? (
                    <NestedList data={page} />
                  ) : (
                    <Typography
                      textTransform="capitalize"
                      textAlign="center"
                      onClick={() => navigate(page?.destination ?? "")}
                    >
                      {page.name}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ITAMS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: Page) =>
              page.hasChild ? (
                <MenuListComposition
                  menuList={page.menuList}
                  name={page.name}
                />
              ) : (
                <Button
                  key={page.name}
                  onClick={() => navigate(page?.destination ?? "")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Notification />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={authContext?.avatar} sizes="small" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item: MenuItemInterface) => (
                <MenuItem
                  key={item.name}
                  onClick={() => handleClickUserMenu(item.destination)}
                >
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
