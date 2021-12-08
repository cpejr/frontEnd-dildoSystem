import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  createRef,
} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { IoMdHeartEmpty } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa';

import {
  Menu, Dropdown, Button, Space,
} from 'antd';
import Logo from '../../images/icone.png';
import AddedProductPopover from './AddedProductPopover';
import { CartContext } from '../../Contexts/CartContext';
import { SearchContext } from '../../Contexts/SearchContext';
import { LoginContext } from '../../Contexts/LoginContext';
import api from '../../services/api';

import './styles.css';

export default function Header() {
  const [search, setSearch] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryWidth, setCategoryWidth] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showResMenu, setShowResMenu] = useState(false);

  const searchContext = useContext(SearchContext);
  const loginContext = useContext(LoginContext);
  const cartContext = useContext(CartContext);

  const headerRef = createRef();
  const bagRef = useRef();
  const heightRef = useRef();
  const inputRef = React.createRef();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };
    api.get('categories', config).then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    function handleCategoriesSize() {
      if (headerRef.current && categories) {
        const width = headerRef.current.scrollWidth / categories.length;
        setCategoryWidth(width);
      }
    }

    window.addEventListener('resize', handleCategoriesSize);

    handleCategoriesSize();

    return () => {
      window.removeEventListener('resize', handleCategoriesSize);
    };
  }, [headerRef]);

  useEffect(() => {
    if (showSearch) inputRef.current.focus();
  }, [showSearch]);

  function handleCategory(id) {
    const searchConfig = { categoryId: id };

    searchContext.handleSearch(searchConfig);
  }

  function handleSubcategory(id) {
    const searchConfig = { subcategoryId: id };

    searchContext.handleSearch(searchConfig);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const searchConfig = { search };

    searchContext.handleSearch(searchConfig);
  }

  return (
    <div
      id="header-wrapper"
      style={{ minHeight: heightRef.current && heightRef.current.scrollHeight }}
    >
      <div id="fake-header" />

      <div id="NewHeader">
        <div id="NewHeader">
          <div className="header-container">
            <Link to="/">
              <img className="logoCasulusDashboard" src={Logo} alt="logo" />
            </Link>

            <div className="header-categories">
              <CSSTransition
                in={showSearch === false}
                unmountOnExit
                timeout={500}
                classNames="categories-header-trans"
              >
                <ul>
                  {categories.map((cat) => {
                    const menu = (
                      <Menu>
                        {cat.subcategories.map((subcat, i) => (
                          <Menu.Item
                            key={i}
                            onClick={() => handleSubcategory(subcat.id)}
                          >
                            {subcat.name}
                          </Menu.Item>
                        ))}
                      </Menu>
                    );
                    return (
                      <Space direction="vertical" key={cat.name}>
                        <Space wrap>
                          <Dropdown
                            className="dropdown-header"
                            overlay={menu}
                            placement="bottomCenter"
                            onClick={() => handleCategory(cat.id)}
                          >
                            <Button>{cat.name}</Button>
                          </Dropdown>
                        </Space>
                      </Space>
                    );
                  })}
                </ul>
              </CSSTransition>
            </div>

            <div className="userInfoSearch">
              {showSearch ? (
                <CSSTransition
                  in={showSearch}
                  unmountOnExit
                  timeout={500}
                  classNames="search-menu"
                >
                  <VscChromeClose
                    className="serach-icon"
                    size={30}
                    onClick={() => setShowSearch(!showSearch)}
                  />
                </CSSTransition>
              ) : (
                <FiSearch
                  className="serach-icon"
                  size={30}
                  onClick={() => setShowSearch(!showSearch)}
                />
              )}

              {loginContext.loggedIn ? (
                <Link
                  to={
                    loginContext.type === 'admin'
                      ? '/admin'
                      : '/user/myrequests'
                  }
                  className="icon-link user-info"
                >
                  <FaRegUser size={30} />
                </Link>
              ) : (
                <Link to="/login" className="icon-link user-info">
                  <FaRegUser size={30} />
                </Link>
              )}

              {loginContext.loggedIn ? (
                <Link to="/user/wishlist" className="icon-link">
                  <IoMdHeartEmpty size={34} style={{ margin: 0 }} />
                </Link>
              ) : (
                <IoMdHeartEmpty size={34} />
              )}

              <Link to="/cart" className="icon-link" ref={bagRef}>
                <HiOutlineShoppingBag size={32} />
                <span className="badge badge-warning" id="lblCartCount">
                  {' '}
                  {cartContext.totalQuantity || 0}
                  {' '}
                </span>
              </Link>

              <AddedProductPopover target={bagRef} />
            </div>
          </div>

          <SearchBar
            showSearch={showSearch}
            handleSubmit={handleSubmit}
            search={search}
            setSearch={setSearch}
            inputRef={inputRef}
          />

          <ResponsiveSearch
            className="responsive-search"
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
            showResMenu={showResMenu}
            setShowResMenu={setShowResMenu}
            showSearch={showSearch}
            categories={categories}
            handleCategory={handleCategory}
            cartQuantity={cartQuantity}
            handleSubcategory={handleSubcategory}
          />
        </div>
      </div>
    </div>
  );
}

const SearchBar = function ({
  showSearch, handleSubmit, search, setSearch, inputRef,
}) {
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
              ref={inputRef}
            />
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

const ResponsiveSearch = function ({
  className,
  handleSubmit,
  search,
  setSearch,
  showResMenu,
  setShowResMenu,
  showSearch,
  handleCategory,
  categories,
  cartQuantity,
  handleSubcategory,
}) {
  const loginContext = useContext(LoginContext);

  const { SubMenu } = Menu;

  const [openKeys, setOpenKeys] = useState([]);

  const rootSubmenuKeys = [];
  categories.map((cat, i) => rootSubmenuKeys.push(i));

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="header-search-responsive">
      <div className="responsive-header-superior">
        <div className="responsive-logo">
          <Link to="/">
            <img className="logoCasulusDashboard" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="icons-responsive-header">
          {loginContext.loggedIn ? (
            <Link
              to={loginContext.type === 'admin' ? '/admin' : '/user/myrequests'}
              className="icon-link user-info"
            >
              <FaRegUser size={30} />
              {/* <p>{loginContext.name}</p> */}
            </Link>
          ) : (
            <Link to="/login" className="icon-link user-info">
              <FaRegUser size={30} />
              {/* <p>{loginContext.name}</p> */}
            </Link>
          )}

          <Link to="/user/wishlist" className="icon-link">
            <IoMdHeartEmpty size={34} />
          </Link>

          <Link to="/cart" className="icon-link">
            <HiOutlineShoppingBag size={32} />
            {/* <span className='badge badge-warning' id='lblCartCount'> {cartQuantity} </span> */}
          </Link>
        </div>
        {showResMenu ? (
          <CSSTransition
            in={showResMenu}
            unmountOnExit
            timeout={500}
            classNames="search-menu"
          >
            <div className="burger-icon">
              <VscChromeClose
                className="burger-icon"
                size={35}
                onClick={() => setShowResMenu(!showResMenu)}
              />
            </div>
          </CSSTransition>
        ) : (
          <div className="burger-icon">
            <GiHamburgerMenu
              size={35}
              onClick={() => setShowResMenu(!showResMenu)}
            />
          </div>
        )}
      </div>

      <CSSTransition
        in={showResMenu}
        unmountOnExit
        timeout={500}
        classNames="categories-header-trans"
      >
        <div className="responsive-menu">
          {/* <div className='fake-menu'></div> */}
          <Menu mode="inline" onOpenChange={onOpenChange} openKeys={openKeys}>
            {categories.map((cat, i) => (
              <SubMenu key={i} title={cat.name}>
                {cat.subcategories.map((subcat, i) => (
                  <Menu.Item
                    key={i}
                    onClick={() => handleSubcategory(subcat.id)}
                  >
                    {subcat.name}
                  </Menu.Item>
                ))}
              </SubMenu>
              //   <button
              //     className="dropbtn"
              //     onClick={() => handleCategory(cat.id)}>{cat.name}
              //   </button>
              // </li>
            ))}
          </Menu>

          {/* <ul >
            {
              categories.map(cat => (
                <li key={cat.id}>
                  <button
                    className="dropbtn"
                    onClick={() => handleCategory(cat.id)}>{cat.name}
                  </button>
                </li>
              )
              )
            }

          </ul> */}
        </div>
      </CSSTransition>

      <div className="productsSearchHeader-responsive">
        <form
          className="form-group has-search-responsive"
          onSubmit={handleSubmit}
        >
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
  );
};
