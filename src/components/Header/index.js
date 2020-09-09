import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/CASULUS00LOGO.svg';
import LogoName from '../../images/CASULUS01LOGONAME.svg';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import api from '../../services/api';

import Burger from '../../components/Burger/index';
import { LoginContext } from '../../Contexts/LoginContext';
import { SearchContext } from '../../Contexts/SearchContext';

import './index.css';
import { Button } from '@material-ui/core';

export default function Header() {

    const [search, setSearch] = useState('');
    let history = useHistory();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const searchContext = useContext(SearchContext);

    function handleSearch(e) {
        e.preventDefault();

        const searchConfig = {search: search};

        searchContext.handleSearch(searchConfig)
        
    }

    const accessToken = localStorage.getItem('accessToken')

    const config = {
        headers: { 'authorization': `Bearer ${accessToken}` }
    }

    useEffect(() => {
        api.get("category", config).then(response => {
            setCategories(response.data)
            console.log(response.data)
        })

        api.get("subCategory", config).then(response => {
            setSubCategories(response.data)
            console.log(response.data)
        })
    }, [])


    const categoriasSet = new Set();
    subCategories.forEach(element => (
        categoriasSet.add(element.catname)
    ))

    const categorias = [...categoriasSet];

    return (
        <div id="Header">
            <div className="headerSuperior">
                <form className="form-group has-search" onSubmit={handleSearch}>
                    <SearchIcon className="fa fa-search form-control-feedback searchIcon" />
                    <input type="text" className="form-control searchInput" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>

                <Link to="/cart" className="icon-link">
                    <ShoppingCartOutlinedIcon />
                </Link>

                <LoginContext.Consumer>

                    {
                        context => {
                            if (context.loggedIn) {
                                return (
                                    <Link to={context.type === "admin" ? "/admin" : "/user"} className="icon-link user-info">
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

                    {
                        categorias.map(element => (
                            <div className="dropdown">
                                <button className="dropbtn">{element} <KeyboardArrowDownIcon /> </button>
                                <div className="dropdown-content">
                                    <div className="emptyHeaderDiv"></div>
                                    <div className="dropdownLinks">
                                        {
                                            subCategories.map(subelement => (
                                                <div>
                                                    {subelement.catname == element &&
                                                        <a href="#">{subelement.subcatname}</a>}
                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                    {/* <div className="dropdown">
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
                    <Link to="">
                        <img className="logoCasulusDashboard" src={Logo} alt="logo" />
                    </Link>



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