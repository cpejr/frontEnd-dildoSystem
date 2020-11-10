import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LogoName from '../../images/CASULUS01LOGONAME.svg';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import api from '../../services/api';

import Burger from '../../components/Burger';
import { LoginContext } from '../../Contexts/LoginContext';
import { SearchContext } from '../../Contexts/SearchContext';

import './styles.css';
import { Button } from '@material-ui/core';

export default function Header() {

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  const searchContext = useContext(SearchContext);
  const loginContext = useContext(LoginContext);

  function handleSubmit(e) {
    e.preventDefault();

    const searchConfig = { search: search };

    searchContext.handleSearch(searchConfig)

  }

  function handleCategory(id) {
    const searchConfig = { categoryId: id }

    searchContext.handleSearch(searchConfig)
  }

  function handleSubcategory(id) {
    const searchConfig = { subcategoryId: id }

    searchContext.handleSearch(searchConfig)
  }

  const accessToken = localStorage.getItem('accessToken')

  const config = {
    headers: { 'authorization': `Bearer ${accessToken}` }
  }

  useEffect(() => {
    api.get("categories", config).then(response => {
      setCategories(response.data)
      // console.log(response.data)
    })
  }, [])

  return (
    <div id="Header">

      <div className="headerSuperior">

        <div className="header-content">
          <Link to="/">
            <img className="logoCasulusDashboard" src={LogoName} alt="logo" />
          </Link>

          <div className="userInfoSearch">
            <form className="form-group has-search" onSubmit={handleSubmit}>
              <SearchIcon className="fa fa-search form-control-feedback searchIcon" />
              <input type="text" className="form-control searchInput" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>

            <Link to="/cart" className="icon-link">
              <ShoppingCartOutlinedIcon />
            </Link>


            {

              (loginContext.loggedIn)
                ?
                (
                  <Link to={loginContext.type === "admin" ? "/admin" : "/user"} className="icon-link user-info">
                    <PersonOutlinedIcon />
                    <p>{loginContext.name}</p>
                  </Link>
                )
                :
                (
                  <Link to="/login">
                    <Button>Entrar</Button>
                  </Link>

                )

            }
          </div>
        </div>


      </div>

      <div className="headerInferior">
        <div className="header-content">
          <img className="headerImg" src={LogoName} alt="logo" />
          <div className="links">
            <div className="emptyDiv"> </div>
            <div className="empty" />

            {
              categories.map(cat => (
                <div className="dropdown">
                  <button className="dropbtn" onClick={() => handleCategory(cat.id)}>{cat.name} <KeyboardArrowDownIcon /> </button>
                  <div className="dropdown-content">
                    <div className="emptyHeaderDiv"></div>
                    <div className="dropdownLinks">
                      {
                        cat.subcategories.map(subcat => (
                          <a href="#" onClick={() => handleSubcategory(subcat.id)}>
                            {subcat.name}
                          </a>
                        ))}
                    </div>

                  </div>
                </div>
              ))
            }

          </div>
        </div>

        <div className="empty" />
        <Burger />
      </div>
    </div>
  );
}