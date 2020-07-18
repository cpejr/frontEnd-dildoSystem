import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../images/CASULUS00LOGO.svg';

import api from '../../services/api';

import HomeNavbar from '../../components/HomeNavbar';
import ProductCard from '../../components/ProductCard';

import './styles.css';

function Dashboard() {

    const [products, setProducts] = useState([]);

    var config = {
        headers: {'authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwibmFtZSI6IkFydGh1ciIsImVtYWlsIjoiQXJ0aHVyMkBnbWFpbC5jb20iLCJmaXJlYmFzZSI6Ik1wbjI3M1FkRWxjeHF2WVlzdUZ1T2UyTkhFNjMiLCJ0eXBlIjoiYWRtaW4iLCJjcGYiOiIxNTExMjM1ODQzOSIsImJpcnRoZGF0ZSI6IjA5LzAxLzIwMDEiLCJ6aXBjb2RlIjoiMzE3NTg0NCIsInBob25lbnVtYmVyIjoiOTg1NzQ2NzM4NCIsInN0YXRlIjoiTWluYXMgR2VyYWlzIiwiY2l0eSI6IkJlbG8gSG9yaXpvbnRlIiwibmVpZ2hib3Job29kIjoiVW5pw6NvIiwic3RyZWV0IjoiTmVsc29uIiwibnVtYmVyIjoiMTIzIiwiY29tcGxlbWVudCI6ImFwdCAxMDEiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0wNSAyMTo1NjozOCIsInVwZGF0ZWRfYXQiOiIyMDIwLTA1LTA1IDIxOjU2OjM4In0sImlhdCI6MTU5NDc1OTkxMiwiZXhwIjoxNTk3MzUxOTEyfQ.QYtnKluLPjux8TmPzeOei3MHEY3PEEAdccKS6o8xOZM'}
    }

    useEffect(() => {
        api.get('products', config).then(response => {
            setProducts(response.data)
        });
    }, [])

    return (
        <div>
            <HomeNavbar />
            {products.map(product => (
                <ProductCard titulo={product.name} preco={product.client_price} img={product.image_id} />
            ))}
        </div>

    );
};
export default Dashboard;