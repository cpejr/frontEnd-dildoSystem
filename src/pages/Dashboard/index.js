import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../images/CASULUS00LOGO.svg';

import api from '../../services/api';

import HomeNavbar from '../../components/HomeNavbar';

import './styles.css';

function Dashboard() {
    return (
        <HomeNavbar />
    );
}
export default Dashboard;