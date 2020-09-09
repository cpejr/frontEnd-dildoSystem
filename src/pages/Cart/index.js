import React from "react";
import { FiX } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Link } from "react-router-dom";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard"
import AdminDashboard from "../../components/AdminDashboard";

function Cart() {
  return (
    <div>
      <AdminDashboard />
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
            <CartCard />
          </div>
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
