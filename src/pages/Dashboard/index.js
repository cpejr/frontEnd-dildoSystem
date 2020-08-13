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
    const [max_price, setMax_Price] = useState();
    const [min_price, setMin_Price] = useState();
    const [order_by, setOrder_by] = useState();
    const [order_ascending, setOrder_ascending] = useState();
    const [search, setSearch] = useState('cheiroso');
    const [subcategory_id, setSubcategory_id] = useState();
    return (
        <div>
            <Header />
            {/* <HomeNavbar /> */}
            <ProductCard filters = {{max_price, min_price, order_by, order_ascending, search, subcategory_id}}/>
        </div>

    );
};
export default Dashboard;