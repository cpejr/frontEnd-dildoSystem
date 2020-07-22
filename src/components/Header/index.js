import React from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../../images/CASULUS00LOGO.svg';
import LogoName from '../../images/CASULUS01LOGONAME.svg';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import Burger from '../../components/Burger/index';

import './index.css';

export default function Header() {

    let history = useHistory();

    return (
        <div id="Header">
            <div className="headerSuperior">
                <div class="form-group has-search">
                    <SearchIcon class="fa fa-search form-control-feedback searchIcon" />
                    <input type="text" class="form-control searchInput" placeholder="Search" />
                </div>
                <div onClick={()=>{history.push('/cart')}}>
                    <ShoppingCartOutlinedIcon />
                </div>
                <PersonOutlinedIcon />
            </div>
            <div className="headerInferior">
                <img className="headerImg" src={LogoName} alt="logo" />
                <div className="links">
                    <div className="emptyDiv"> </div>
                    <div classNameName="empty" />
                    <div className="dropdown">
                        <button className="dropbtn">Cosméticos</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Acessórios</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Brincadeiras</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Próteses</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <img className="logoCasulusDashboard" src={Logo} alt="logo" />
                    <div className="dropdown">
                        <button className="dropbtn">Sado</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Moda Sensual</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Higiene e Banho</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Outros</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
                <div classNameName="empty" />
                <Burger />
            </div>
        </div>
    );
}