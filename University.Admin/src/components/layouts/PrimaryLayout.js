import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectUser } from '@store/auth';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Snackbar from '@components/shared/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const mapStateToProps = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
};

function PrimaryLayout({ children, user }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fangmin University
          </Typography>
          {user ? (
            <span>{user.email}</span>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {children}

      <Snackbar />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PrimaryLayout));
