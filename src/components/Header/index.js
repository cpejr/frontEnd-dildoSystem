import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/CASULUS00LOGO.svg';
import LogoName from '../../images/CASULUS01LOGONAME.svg';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Burger from '../../components/Burger/index';

import './index.css';

export default function Header() {

    let history = useHistory();
    const [isIconsVisible, setIconsVisible] = useState(false);
    const [IsLoginButtonVisible, setIsLoginButtonVisible] = useState(false);

    useEffect(() => {
        if(localStorage.accessToken){
            setIconsVisible(true);
            setIsLoginButtonVisible(false);
         } else {
            setIconsVisible(false);
            setIsLoginButtonVisible(true); 
         }
        }
    );
    return (
        <div id="Header">
            <div className="headerSuperior">
                <div className="form-group has-search">
                    <SearchIcon className="fa fa-search form-control-feedback searchIcon" />
                    <input type="text" className="form-control searchInput" placeholder="Search" />
                </div>

                {isIconsVisible ? <div className="iconsDashboard"><div onClick={() => { history.push('/cart') }}>
                    <ShoppingCartOutlinedIcon />
                </div>
                    <div onClick={() => { history.push('/admin') }}>
                        <PersonOutlinedIcon />
                    </div></div> : null}

                {IsLoginButtonVisible ? <div className="loginButton" onClick={() => { history.push('/Login') }}>
                    <button>LOGIN</button>
                </div> : null} 


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