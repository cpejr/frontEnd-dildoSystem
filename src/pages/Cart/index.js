import React, { useState, useEffect, useContext } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard"
import Header from "../../components/Header";
import Frete from '../testefrete'
import { useCart, CartContext } from '../../Contexts/CartContext';
import api from '../../services/api'

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newProducts, setNewProducts] = useState([])
  const [localCart, setLocalCart] = useState();
  const [hasCart, setHasCart] = useState(false);
  // const { cart } = useCart();

  const cartContext = useContext(CartContext);
  console.log('cart context', cartContext);

  useEffect(() => {
    setLocalCart(JSON.parse(localStorage.getItem('cart')))
    setHasCart(true);
  }, [])

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');

  //   const config = {
  //     headers: { 'authorization': `Bearer ${accessToken}` },
  //   }

  //   if (accessToken) {
  //     api.post("cart", localCart, config).then(res => {
  //       console.log("Carrinho do back: ", res.data);
  //       setProducts(res.data);
  //     })
  //   }
  // }, [hasCart]);

  function addNewProducts(products) {
    for (var i = 0; i < newProducts.length; i++) {
      if (products.productId === newProducts[i].productId) {
        newProducts.splice(i, 1);
      }
    }
    setNewProducts(newProducts => [...newProducts, products])
  }

  function deleteProduct(product) {
    console.log("Delete product: ", product)
    for (var i = 0; i < newProducts.length; i++) {
      if (product.productId === newProducts[i].productId) {
        newProducts.splice(i, 1);
      }
    }
    setNewProducts(newProducts => [...newProducts])
  }

  useEffect(() => {
    console.log("Entreiiiiii")
    let price = 0;
    newProducts.forEach(p => {
      price += (p.productPrice * p.product_quantity);
    })
    console.log("Price: ", price)
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
            {cartContext.cart ? cartContext.cart.map((product) => (
              // console.log("Produtooooo: ", product)
              <CartCard key={product.id}
                name={product.name}
                description={product.description}
                productId={product.id}
                product={product}
                image_id={product.image_id}
                onChangePrice={addNewProducts}
                onDeleteProduct={deleteProduct} />
            )) : <div></div>}
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
