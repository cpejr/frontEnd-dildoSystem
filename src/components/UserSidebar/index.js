import React from 'react';
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
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StarIcon from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';
import ReplyIcon from '@material-ui/icons/Reply';
import { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa'

import Logo from "../../images/CASULUS_LOGO_PRETO.svg"; //CASULUS_LOGO_PRETO.svg
import Text from "../../images/CASULUS_TEXTO_PRETO.svg"; //CASULUS_TEXTO_PRETO.svg

import "./styles.css";
import { LoginContext } from "../../Contexts/LoginContext";

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: "#F9CE56",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  content2: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function UserSidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(window.innerWidth > 1000);

  function getWindowdimension() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
    };
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [Windowdimension, setWindowdimension] = useState(getWindowdimension());

  useEffect(() => {
    function handleSize() {
      setWindowdimension(getWindowdimension());
    }
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={`${clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })} header-bar`}
      >
        <Toolbar style={{ height: 70, display: "flex" }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <div className="iconDiv">
              <img
                className="logo"
                src={Logo}
                alt="logo"

              />
              <img
                className="text"
                src={Text}
                alt="text"

              />
            </div>
          </Link>

          <div className="userDiv">
            <Link to="/cart">
              <div className="cartDiv">
                <div className="cart">
                  <ShoppingCartOutlinedIcon />
                </div>
              </div>
            </Link>
            <div className="user">
              <h5>{props.name}</h5>
              <p>({props.type})</p>
            </div>
            <div>
              <FaUserAlt />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {Windowdimension.width > 900 ? (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} style={{ height: 70 }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                  <ChevronRightIcon />
                )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              component={Link}
              to="/user/myrequests"
              onClick={props.handleDrawerClose}
            >
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText>Meus Pedidos</ListItemText>
            </ListItem>

            <Divider />

            <ListItem
              button
              component={Link}
              to="/user/wishlist"
              onClick={props.handleDrawerClose}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText>Lista de Desejos</ListItemText>
            </ListItem>

            <Divider />

            <ListItem
              button
              component={Link}
              to="/user/usersettings"
              onClick={props.handleDrawerClose}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Meus Dados</ListItemText>
            </ListItem>
            <Divider />

            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={props.handleDrawerClose}
            >
              <ListItemIcon>
                <ShoppingCartOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Meu Carrinho</ListItemText>
            </ListItem>
            <Divider />

            <ListItem
              button
              component={Link}
              to="/"
              onClick={props.handleDrawerClose}
            >
              <ListItemIcon>
                <ReplyIcon />
              </ListItemIcon>
              <ListItemText>Voltar às Compras</ListItemText>
            </ListItem>

            <Divider />
            <LoginContext.Consumer>
              {(context) => (
                <ListItem
                  button
                  onClick={context.handleLogout}
                  style={{ position: "fixed", bottom: 0, width: 240 }}
                >
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText>Sair</ListItemText>
                </ListItem>
              )}
            </LoginContext.Consumer>
          </List>
        </Drawer>
      ) : (
          <Drawer
            className={classes.drawer}
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader} style={{ height: 75 }}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                    <ChevronRightIcon />
                  )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                to="/user/myrequests"
                onClick={props.handleDrawerClose}
              >
                <ListItemIcon>
                  <LocalMallIcon />
                </ListItemIcon>
                <ListItemText>Meus Pedidos</ListItemText>
              </ListItem>

              <Divider />

              <ListItem
                button
                component={Link}
                to="/user/wishlist"
                onClick={props.handleDrawerClose}
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText>Lista de Desejos</ListItemText>
              </ListItem>

              <Divider />

              <ListItem
                button
                component={Link}
                to="/user/usersettings"
                onClick={props.handleDrawerClose}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Meus Dados</ListItemText>
              </ListItem>
              <Divider />

              <ListItem
                button
                component={Link}
                to="/"
                onClick={props.handleDrawerClose}
              >
                <ListItemIcon>
                  <ReplyIcon />
                </ListItemIcon>
                <ListItemText>Voltar às Compras</ListItemText>
              </ListItem>

              <Divider />
              <LoginContext.Consumer>
                {(context) => (
                  <ListItem
                    button
                    onClick={context.handleLogout}
                    style={{ position: "fixed", bottom: 0, width: 240 }}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText>Sair</ListItemText>
                  </ListItem>
                )}
              </LoginContext.Consumer>
            </List>
          </Drawer>
        )}
      {Windowdimension.width > 900 ? (
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className="main-admin-container">{props.children}</div>
        </main>
      ) : (
          <main
            className={clsx(classes.content2, {
              [classes.contentShift]: open,
            })}
          >
            <div className="main-admin-container">{props.children}</div>
          </main>
        )}
    </div>
  );
}
