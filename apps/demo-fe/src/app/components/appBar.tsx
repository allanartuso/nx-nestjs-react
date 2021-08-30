import { authActions, authSelectors } from '@dm/react/shared/feature-auth';
import { Button, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/">
              <Logo />
            </Link>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            demo-be
          </Typography>

          {isLoggedIn ? (
            <IconButton onClick={handleProfileMenuOpen}>
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
        getContentAnchorEl={null}
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
