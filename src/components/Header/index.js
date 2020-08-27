import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Logo from '../../images/CASULUS00LOGO.svg';
import LogoName from '../../images/CASULUS01LOGONAME.svg';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Burger from '../../components/Burger/index';
import { LoginContext } from '../../Contexts/LoginContext';

import './index.css';
import { Button } from '@material-ui/core';

export default function Header() {

    let history = useHistory();

    return (
        <div id="Header">
            <div className="headerSuperior">
                <div className="form-group has-search">
                    <SearchIcon className="fa fa-search form-control-feedback searchIcon" />
                    <input type="text" className="form-control searchInput" placeholder="Search" />
                </div>
                <Link to="/cart" className="icon-link">
                    <ShoppingCartOutlinedIcon />
                </Link>

                <LoginContext.Consumer>

                    {
                        context => {
                            if (context.loggedIn) {
                                return (
                                    <Link to={context.type==="admin"?"/admin":"/user"} className="icon-link user-info">
                                        <PersonOutlinedIcon />
                                        <p>{context.name}</p>
                                    </Link>

                                )
                            } else {
                                return (
                                    <Link to="/login">
                                        <Button>Entrar</Button>
                                    </Link>

                                )
                            }
                        }
                    }

                </LoginContext.Consumer>

            </div>
            <div className="headerInferior">
                <img className="headerImg" src={LogoName} alt="logo" />
                <div className="links">
                    <div className="emptyDiv"> </div>
                    <div className="empty" />
                    <div className="dropdown">
                        <button className="dropbtn">Cosméticos <KeyboardArrowDownIcon /> </button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Acessórios <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Brincadeiras <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Próteses <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <img className="logoCasulusDashboard" src={Logo} alt="logo" />
                    <div className="dropdown">
                        <button className="dropbtn">Sado <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Moda Sensual <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Higiene e Banho <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Outros <KeyboardArrowDownIcon /></button>
                        <div className="dropdown-content">
                            <div className="emptyHeaderDiv"></div>
                            <div className="dropdownLinks">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="empty" />
                <Burger />
            </div>
        </div>
    );
}