import React from 'react';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import { selectUser } from '@store/auth';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  InputBase,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Snackbar from '@components/shared/Snackbar';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightActions: {
    float: 'right',
    textAlign: 'right',
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    minWidth: '500px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    minWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const mapStateToProps = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
};

function PrimaryLayout({ children, user }) {

  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleClickMenu = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Fangmin University
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Whatever you're thinking..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.rightActions}>
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
          </div>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            onClick={handleClickMenu}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem>
            Drawer...
          </ListItem>
        </List>

      </Drawer>

      {children}

      <Snackbar />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PrimaryLayout));
