import React, { useState } from 'react';

import api from '../../services/api';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';


export default function SideBar(props) {
    return (
        <div className="navbar">
            <Drawer open={props.drawer} onClose={props.handleDrawerClose} >
                <List>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> Icone </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>

                    <Divider/>

                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> Icone </ListItemIcon>
                        <ListItemText>Novo Produto</ListItemText>
                    </ListItem>

                    <Divider/>

                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> Icone </ListItemIcon>
                        <ListItemText>Editar Produto</ListItemText>
                    </ListItem>

                    <Divider/>

                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> Icone </ListItemIcon>
                        <ListItemText>Usuários Pendentes</ListItemText>
                    </ListItem>

                    <Divider/>

                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> Icone </ListItemIcon>
                        <ListItemText>Pedidos Pendentes</ListItemText>
                    </ListItem>

                </List>
            </Drawer>
        </div>
    );
}