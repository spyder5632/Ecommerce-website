import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Auth/Action';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AdminNavbar({ handleSideBarViewInMobile }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // handleCloseUserMenu();
    dispatch(logout());
    navigate("/")
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  // https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + isLargeScreen, backgroundColor: 'rgb(0, 0, 22)' }}>
        <Toolbar>
          {!isLargeScreen && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleSideBarViewInMobile}
          >
            <MenuIcon />
          </IconButton>}
          <Avatar alt="Zosh" src="data:image/png;base64,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" />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
  );
}