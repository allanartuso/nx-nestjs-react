import { authActions, authSelectors } from '@dm/react/shared/feature-auth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface DemoBeColors {
  background: string;
  aggressivePink: string;
  blue: string;
  yellow: string;
}

export const DemoBeColors: DemoBeColors = {
  background: '#fbb77b',
  aggressivePink: '#fb2c7c',
  blue: '#2c6c9b',
  yellow: '#fcf304',
};

const Logo = () => {
  return (
    <div>
      <img src="assets/logo.png" alt="" style={{ width: 35, height: 35 }} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: 'center',
    color: '#571F71',
    fontFamily: ['Chilanka', 'cursive'].join(','),
  },
  root: {
    flexGrow: 0,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
    textAlign: 'left',
    color: '#571F71',
    fontFamily: ['Chilanka', 'cursive'].join(','),
  },
  actionButtons: {
    color: '#571F71',
    fontFamily: ['Chilanka', 'cursive'].join(','),
  },
}));

export default function ButtonAppBar() {
  const wrapper: React.RefObject<any> = React.createRef();
  const classes = useStyles();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(authActions.signOut());
    handleMenuClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: DemoBeColors.background }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" size="large">
            <Link to="/">
              <Logo />
            </Link>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            demo-be
          </Typography>

          {isLoggedIn ? (
            <IconButton onClick={handleProfileMenuOpen} size="large">
              <AccountCircle />
            </IconButton>
          ) : (
            <Button className={classes.actionButtons}>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/user/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/auth/change-password">Change Password</Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
