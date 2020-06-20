import React, { useState } from 'react';

import api from '../../services/api';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Home, LibraryAddCheck, LocalOffer, Group, ChromeReaderMode , ExitToApp } from '@material-ui/icons';


export default function SideBar(props) {
    return (
        <Drawer open={props.drawer} onClose={props.handleDrawerClose} >
            <List>
                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><LibraryAddCheck /></ListItemIcon>
                    <ListItemText>Novo Produto</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><LocalOffer /></ListItemIcon>
                    <ListItemText>Editar Produto</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText>Usuários Pendentes</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><ChromeReaderMode /></ListItemIcon>
                    <ListItemText>Pedidos Pendentes</ListItemText>
                </ListItem>

                <Divider />

                <ListItem button onClick={props.handleDrawerClose}>
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <ListItemText>Sair</ListItemText>
                </ListItem>

            </List>
        </Drawer>
    );
}