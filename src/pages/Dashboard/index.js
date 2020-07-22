import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../images/CASULUS00LOGO.svg';
import Header from '../../components/Header/index';

import api from '../../services/api';

import HomeNavbar from '../../components/HomeNavbar';
import ProductCard from '../../components/ProductCard';

import './styles.css';

function Dashboard() {
    return (
        <div>
            <Header />
            {/* <HomeNavbar /> */}
            <ProductCard />
        </div>

    );
};
export default Dashboard;