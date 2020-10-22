import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Link } from "react-router-dom";
import cart from "../../services/cart";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard"
import AdminDashboard from "../../components/AdminDashboard";
import Header from "../../components/Header";
import Frete from '../testefrete'

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    setProducts(cart);
  }, [])

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-content">
          <h2>
            Carrinho
            <button>
              <FiX />
            </button>
          </h2>
          <p className="deliver-date">Entrega de x/xx/xxxx à x/xx/xxxx</p>
          <div className="cart-items">
            {products.map((product) => (
              // console.log("Produto: ", product);
              <CartCard name={product.product.name} description={product.product.description} productId={product.product.id} product={product} image_id={product.product.image_id }/>
            ))}
          </div>
          <Frete products={products}/>
          <div className="button-area">
            <button className="cart-primary-button">COMPRAR</button>
            <Link to="/dashboard">
              <button className="cart-secondary-button">
                CONTINUAR COMPRANDO
              </button>
            </Link>
          </div>
          
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
