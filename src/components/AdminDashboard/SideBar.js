import React from 'react';
import { Link } from 'react-router-dom';

import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core';
import {
  Home, LibraryAddCheck, LocalOffer, Group, ChromeReaderMode, ExitToApp,
} from '@material-ui/icons';

export default function SideBar(props) {
  return (
    <Drawer open={props.drawer} onClose={props.handleDrawerClose}>
      <List>
        <ListItem button component={Link} to="/admin" onClick={props.handleDrawerClose}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/newproducts" onClick={props.handleDrawerClose}>
          <ListItemIcon><LibraryAddCheck /></ListItemIcon>
          <ListItemText>Novo Produto</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/editproducts" onClick={props.handleDrawerClose}>
          <ListItemIcon><LocalOffer /></ListItemIcon>
          <ListItemText>Editar Produto</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/allusers" onClick={props.handleDrawerClose}>
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText>Todos os Usuários</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/pendingUsers" onClick={props.handleDrawerClose}>
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText>Usuários Pendentes</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/pendingorders" onClick={props.handleDrawerClose}>
          <ListItemIcon><ChromeReaderMode /></ListItemIcon>
          <ListItemText>Pedidos Pendentes</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/pendingorders" onClick={props.handleDrawerClose}>
          <ListItemIcon><ChromeReaderMode /></ListItemIcon>
          <ListItemText>Controle de Estoque</ListItemText>
        </ListItem>

        <Divider />

        <ListItem button component={Link} to="/" onClick={props.handleDrawerClose}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </ListItem>

      </List>
    </Drawer>
  );
}
