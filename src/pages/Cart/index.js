import React, { useState, useEffect, useContext } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard"
import Header from "../../components/Header";
import Frete from '../../components/Frete'

import { useCart } from '../../Contexts/CartContext';
import api from '../../services/api'


function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useCart();



  const getRealPrice = (product) => {
    let product_price;
    if (product.wholesaler_price) {
      if (product.on_sale_wholesaler) {
        product_price = (product.wholesaler_sale_price).toFixed(2)
      } else {
        product_price = (product.wholesaler_price).toFixed(2)
      }
    } else {
      if (product.on_sale_client) {
        product_price = (product.client_sale_price).toFixed(2)
      } else {
        product_price = (product.client_price).toFixed(2)
      }
    }
    return product_price;
  }

  useEffect(() => {
    let price = 0;
    if (cart) {
      cart.forEach(p => {
        price += (getRealPrice(p) * p.quantity);
      })
    }
    setTotalPrice(price);
  }, [cart])

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-content">
          <h2>
            Carrinho
          </h2>
          <div className="cart-items">

            {cart ? cart.map((product) => (
              <CartCard key={product.id}
                name={product.name}
                description={product.description}
                productId={product.id}
                product={product}
                image_id={product.image_id}
              />
            )) : <div></div>}

          </div>
          <div className='total-price'>
            <h3>Valor Total: {new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</h3>
          </div>
          <div className="borderEmpty"></div>
          <div className='container frete'>
            <Frete products={cart} totalprice={totalPrice}/>
          </div>
          <div className="button-area">
            {cart && cart.length > 0 && (<Link to="/addresses">
              <button className="cart-primary-button">COMPRAR</button>
            </Link>)}
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
