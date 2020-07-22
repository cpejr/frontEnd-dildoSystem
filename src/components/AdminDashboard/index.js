import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import api from '../../services/api';

import { PersonOutline } from '@material-ui/icons';
import Logo from '../../images/CASULUS01LOGODESIGN.svg';
import Text from '../../images/CASULUS01LOGONAME.svg';
import SideBar from "../../components/AdminDashboard/SideBar";

import './styles.css'

export default function AdminDashboard(props) {
    const [drawer, setDrawer] = useState(false);

    function handleDrawerOpen() {
        setDrawer(true);
    }

    function handleDrawerClose() {
        setDrawer(false);
    }

    return (
        <div className="navbar">

            <div className="menuDiv">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    style={{ position: "fixed", "zIndex": "1" }}
                >
                    <Menu fontSize="large" />
                </IconButton>
                <SideBar drawer={drawer} handleDrawerClose={handleDrawerClose} />
            </div>

            <div className="iconDiv">
                <img className="logo" src={Logo} alt="logo" />
                <img className="text" src={Text} alt="text" />
            </div>

            <div className="userDiv">
                <div className="user"><h5>{props.name}</h5><p>{props.type}</p></div>
                <div><PersonOutline /></div>
            </div>

        </div>
    );
}