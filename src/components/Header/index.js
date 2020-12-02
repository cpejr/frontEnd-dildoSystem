import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import LogoName from '../../images/CASULUS01LOGONAME.svg';
import Logo from '../../images/CASULUS01LOGODESIGN.svg';

import api from "../../services/api";

import Burger from "../../components/Burger";
import { LoginContext } from "../../Contexts/LoginContext";
import { SearchContext } from "../../Contexts/SearchContext";

import "./styles.css";



export default function Header() {

  const [search, setSearch] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0)
  const [categories, setCategories] = useState([]);

  const searchContext = useContext(SearchContext);
  const loginContext = useContext(LoginContext);

  function handleSubmit(e) {
    e.preventDefault();

    const searchConfig = { search: search };

    searchContext.handleSearch(searchConfig);
  }

  function handleCategory(id) {
    const searchConfig = { categoryId: id };

    searchContext.handleSearch(searchConfig);
  }

  function handleSubcategory(id) {
    const searchConfig = { subcategoryId: id };

    searchContext.handleSearch(searchConfig);
  }



  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };
    api.get("categories", config).then((response) => {
      setCategories(response.data);
      // console.log(response.data)
    })
  }, [])
  useEffect(() => {
    let products_quantity = 0;
    let newCart;
    if (localStorage.getItem('cart')) {
      newCart = JSON.parse(localStorage.getItem('cart'));
    }
    if(newCart){
      for (var i = 0; i < newCart.length; i++) {
        products_quantity += newCart[i].quantity
      }
    }
    setCartQuantity(products_quantity)
  })


  return (
    <div id="Header">
      <div className="headerSuperior">
        <div className="header-content">
          <Link to="/">
            <img className="logoCasulusDashboard" src={Logo} alt="logo" />
            <img className="logoNameCasulusDashboard" src={LogoName} alt="logo name" />
          </Link>

          <div className="userInfoSearch">
            <form className="form-group has-search" onSubmit={handleSubmit}>
              <SearchIcon className="fa fa-search form-control-feedback searchIcon" />
              <input
                type="text"
                className="form-control searchInput"
                placeholder="O que você está buscando?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <Link to="/cart" className="icon-link">
              <FaShoppingCart />
              <span class='badge badge-warning' id='lblCartCount'> {cartQuantity} </span>
            </Link>

            {loginContext.loggedIn ? (
              <Link
                to={loginContext.type === "admin" ? "/admin" : "/user"}
                className="icon-link user-info"
              >
                <FaUserAlt />
                <p>{loginContext.name}</p>
              </Link>
            ) : (
                <Link to="/login">
                  <button className="loginBtn">Login / Cadastrar</button>
                </Link>
              )}
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
                <div className="dropdown" key={cat.id}>
                  <button className="dropbtn" onClick={() => handleCategory(cat.id)}>{cat.name} <KeyboardArrowDownIcon /> </button>
                  <div className="dropdown-content">
                    <div className="emptyHeaderDiv"></div>
                    <div className="dropdownLinks">
                      {
                        cat.subcategories.map(subcat => (
                          <a key={subcat.id} href="#" onClick={() => handleSubcategory(subcat.id)}>
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
        {loginContext.loggedIn ? (
          <Link
            to={loginContext.type === "admin" ? "/admin" : "/user/myrequests"}
            className="icon-link user-info-responsive"
          >
            <FaUserAlt />
          </Link>
        ) : (
            <Link to="/login" className="icon-link user-info-responsive">
              <FaUserAlt />
            </Link>
          )}
        <Link to="/cart" className="icon-link-responsive">
          <FaShoppingCart />
        </Link>
      </div>
      <ResponsiveSearch
        className="responsive-search"
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function ResponsiveSearch({ className, handleSubmit, search, setSearch }) {
  return (
    <form className={`form-group has-search ${className}`} onSubmit={handleSubmit}>

      <input
        type="text"
        className="form-control searchInput"
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit"><SearchIcon className="fa fa-search form-control-feedback searchIcon" /></button>
    </form>
  );
}
