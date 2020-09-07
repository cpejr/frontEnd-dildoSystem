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
import ControlledCarousel from '../../components/Slider/Slider';

import './styles.css';

function Dashboard(props) {
    const [max_price, setMax_Price] = useState();
    const [min_price, setMin_Price] = useState();
    const [order_by, setOrder_by] = useState();
    const [order_ascending, setOrder_ascending] = useState();
    const [search, setSearch] = useState();
    const [subcategory_id, setSubcategory_id] = useState();

    useEffect(() => {
        let newSearch = props.location.search;
        const equalsIndex = newSearch.indexOf('=') + 1;
        newSearch = newSearch.substring(equalsIndex);
        setSearch(newSearch);
    })

    return (
        <div className="content">
            <div className="content">
                <Header />
            </div>
            <div className="dashboard-content">
                {/* <HomeNavbar /> */}
                <ControlledCarousel />

                <h2>PROMOÇÕES</h2>

                <ProductCard filters={{ featured:true }} />

            </div>
        </div>
    );
};
export default Dashboard;