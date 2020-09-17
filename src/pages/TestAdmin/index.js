import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { PersonOutline } from '@material-ui/icons';
import { Home, LibraryAddCheck, LocalOffer, Group, ChromeReaderMode , ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';

import Logo from '../../images/CASULUS01LOGODESIGN.svg';
import Text from '../../images/CASULUS01LOGONAME.svg';

import './styles.css';
import { LoginContext } from '../../Contexts/LoginContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: '#DAA621',
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function AdminDashboard2(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(window.innerWidth > 1000
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = useContext(LoginContext) 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{height: 75, display: "flex"}}>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className="iconDiv">
              <img className="logo" src={Logo} alt="logo" width="75" height="75" />
              <img className="text" src={Text} alt="text" width="75" height="75" />
          </div>
          <div className="userDiv">
                <div className="user"><h5>{props.name}</h5><p>{props.type}</p></div>
                <div><Link to="/admin"><PersonOutline /></Link></div>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} style={{height: 75}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon/>}
          </IconButton>
        </div>
        <Divider />
        <List>
                <ListItem button component={Link} to="/admin" onClick={props.handleDrawerClose}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button component={Link} to="/admin/newproduct" onClick={props.handleDrawerClose}>
                    <ListItemIcon><LibraryAddCheck /></ListItemIcon>
                    <ListItemText>Novo Produto</ListItemText>
                </ListItem>

                <Divider />


                <ListItem button component={Link} to="/admin/editproduct" onClick={props.handleDrawerClose}>
                    <ListItemIcon><LocalOffer /></ListItemIcon>
                    <ListItemText>Produtos</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button component={Link} to="/admin/pendingusers" onClick={props.handleDrawerClose}>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText>Usuários Pendentes</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button component={Link} to="/admin/pendingorder" onClick={props.handleDrawerClose}>
                    <ListItemIcon><ChromeReaderMode /></ListItemIcon>
                    <ListItemText>Pedidos Pendentes</ListItemText>
                </ListItem>

                <Divider />
                <ListItem button component={Link} to="/admin/carocel" onClick={props.handleDrawerClose}>
                    <ListItemIcon><ImageIcon /></ListItemIcon>
                    <ListItemText>Carrocel</ListItemText>
                </ListItem>

                <Divider />

              <LoginContext.Consumer>
                {
                  context => (
                <ListItem button onClick={context.handleLogout}  style={{position: 'fixed', bottom: 0, width: 240}}>
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <ListItemText>Sair</ListItemText>
                </ListItem>)}
              </LoginContext.Consumer>
            </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className='main-admin-container'>
          {props.children}
        </div>
        
      </main>
    </div>
  );
}
