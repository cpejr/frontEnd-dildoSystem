import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons';

import api from '../../services/api';


import SideBar from "./SideBar";
import './styles.css';

function Admin() {

    const [drawer, setDrawer] = useState(false);

    function handleDrawerOpen() {
        setDrawer(true);
    }

    function handleDrawerClose() {
        setDrawer(false);
    }

    return (
        <div className="navbar">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                style={{ position: "fixed", "z-index": "1" }}
            >
                <MenuIcon fontSize="large" />
            </IconButton>
            <SideBar drawer={drawer} handleDrawerClose={handleDrawerClose} />
        </div>
    );
}
export default Admin;