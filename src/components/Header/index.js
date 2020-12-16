import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


import SearchIcon from '@material-ui/icons/Search';
import { FaShoppingCart, FaUserAlt, FaRegUser } from 'react-icons/fa'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi'

import LogoName from '../../images/CASULUS01LOGONAME.svg';
import Logo from '../../images/CASULUS01LOGODESIGN.svg';

import api from "../../services/api";

import Burger from "../../components/Burger";
import { LoginContext } from "../../Contexts/LoginContext";
import { SearchContext } from "../../Contexts/SearchContext";

import "./styles.css";
import { createRef } from 'react';
import { CssBaseline } from '@material-ui/core';



export default function Header() {

  const [search, setSearch] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0)
  const [categories, setCategories] = useState([]);
  const [categoryWidth, setCategoryWidth] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const searchContext = useContext(SearchContext);
  const loginContext = useContext(LoginContext);

  const headerRef = createRef();

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
    let newCart = [];
    if (localStorage.getItem('cart')) {
      newCart = JSON.parse(localStorage.getItem('cart'));
    }
    if (newCart) {
      for (var i = 0; i < newCart.length; i++) {
        products_quantity += newCart[i].quantity
      }
    }
    setCartQuantity(products_quantity)
  })

  useEffect(() => {
    function handleCategoriesSize() {
      if (headerRef.current && categories) {
        //console.log(headerRef)
        const width = headerRef.current.scrollWidth / categories.length;
        //console.log(width);
        setCategoryWidth(width);
      }
    }

    window.addEventListener("resize", handleCategoriesSize);

    handleCategoriesSize();

    return () => { window.removeEventListener("resize", handleCategoriesSize) }

  }, [headerRef])


  return (
    <div id="Header">
      <div className="headerSuperior">
        <div className="header-content">
          <Link to="/">
            <img className="logoCasulusDashboard" src={Logo} alt="logo" />
            {/* <img className="logoNameCasulusDashboard" src={LogoName} alt="logo name" /> */}
          </Link>

          <div className="header-categories">
            <CSSTransition
              in={showSearch === false}
              unmountOnExit
              timeout={500}
              classNames="categories-header-trans"
            >

              <ul >

                {
                  categories.map(cat => (
                    <li key={cat.id}>
                      <button className="dropbtn" onClick={() => handleCategory(cat.id)}>{cat.name} </button>
                      {/* <div className="dropdown" key={cat.id} >
                        <button className="dropbtn" onClick={() => handleCategory(cat.id)}>{cat.name} </button>
                        <div className="dropdown-content">
                          <div className="emptyHeaderDiv"></div>
                          <div className="dropdownLinks">
                            {
                              cat.subcategories.map(subcat => (
                                <button key={subcat.id} href="#" onClick={() => handleSubcategory(subcat.id)}>
                                  {subcat.name}
                                </button>
                              ))}
                          </div>

                        </div>""
                        </div> */}
                    </li>
                  )
                  )
                }

              </ul>
            </CSSTransition>
          </div>





          <div className="userInfoSearch">
            <FiSearch className="serach-icon" size={30} onClick={() => setShowSearch(!showSearch)} />

            {loginContext.loggedIn ? (
              <Link
                to={loginContext.type === "admin" ? "/admin" : "/user"}
                className="icon-link user-info"
              >
                <FaRegUser size={30} />
                {/* <p>{loginContext.name}</p> */}
              </Link>
            ) : (
                <Link to="/login">
                  <button className="loginBtn">Login / Cadastrar</button>
                </Link>
              )}

            < IoMdHeartEmpty size={34} />

            <Link to="/cart" className="icon-link">
              <HiOutlineShoppingBag size={32} />
              <span className='badge badge-warning' id='lblCartCount'> {cartQuantity} </span>
            </Link>


          </div>
        </div>
      </div>

      <SearchBar
        showSearch={showSearch}
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />

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

function SearchBar({ showSearch, handleSubmit, search, setSearch }) {
  return (
    <CSSTransition
      in={showSearch}
      unmountOnExit
      timeout={500}
      classNames="search-menu"
    >
      <div className="header-search">
        <div className="productsSearchHeader">
          <form className="form-group has-search" onSubmit={handleSubmit}>
            <FiSearch className="serach-icon" size={36} />
            <input
              type="text"
              className="form-control searchInput"
              placeholder="Procurar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </CSSTransition>
  )
}
