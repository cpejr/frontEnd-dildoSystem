import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../images/CASULUS00LOGO.svg';

import './styles.css';

function HomeNavbar() {
    return (
        <div className="topBackground">
            {/* <div className="home-navbar"> */}
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
                <Navbar className="home-navbar" expand="lg" >
                    <Navbar.Toggle aria-controls="basic-nav-dropdown17" />
                    <Navbar.Collapse id="basic-nav-dropdown17">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                            <NavDropdown className="menu-item" title="Cosméticos" id="basic-nav-dropdown1">
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown  className="menu-item" title="Acessórios" id="basic-nav-dropdown2">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="menu-item" title="Brincadeiras" id="basic-nav-dropdown3">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="menu-item" title="Próteses" id="basic-nav-dropdown13">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <img className="logodashboard" src={Logo} alt="logo" />
                            

                                <NavDropdown className="menu-item" title="Sado" id="basic-nav-dropdown4">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className="menu-item" title="Moda Sensual" id="basic-nav-dropdown5">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className="menu-item" title="Higiene e Banho" id="basic-nav-dropdown6">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className="menu-item" title="Outros" id="basic-nav-dropdown7">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            {/* </div> */}
        </div >
    );
}

export default HomeNavbar;