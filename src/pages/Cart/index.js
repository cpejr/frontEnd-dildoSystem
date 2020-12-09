import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard"
import Header from "../../components/Header";
import Frete from '../testefrete'

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newProducts, setNewProducts] = useState([])

  useEffect(() => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    setProducts(cart);
  }, []);

  function addNewProducts(products) {
    for (var i = 0; i < newProducts.length; i++) {
      if (products.productId === newProducts[i].productId) {
        newProducts.splice(i, 1);
      }
    }
    setNewProducts(newProducts => [...newProducts, products])
  }

  useEffect(() => {
    let price = 0;
    newProducts.forEach(p => {
      price += (p.productPrice * p.product_quantity);
    })
    setTotalPrice(price);
  }, [newProducts])

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-content">
          <h2>
            Carrinho
          </h2>
          <div className="cart-items">
            
          </div>
          <div className='total-price'>
            <h3>Valor Total: {new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</h3>
          </div>
          <div className="borderEmpty"></div>
          <Frete products={products} />
          <div className="button-area">
            <Link to="/addresses">
              <button className="cart-primary-button">COMPRAR</button>
            </Link>
            <Link to="/">
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
