import React from "react";
import { FiX, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

import "./styles.css";
import "../../global.css";

import Footer from "../../components/Footer";
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
          <p>Entrega de x/xx/xxxx à x/xx/xxxx</p>
          <div className="cart-items">
            <div className="cart-card">
              <div className="cart-img">
                <div className="empty"></div>
              </div>
              <div>
                <div>
                  <h4>Gel de Massagem Corporal Lobisomem - 15 ml</h4>
                </div>
                <div>
                  <p>Descrição um pouco mais detalhada do produto </p>
                </div>
                <div>
                  <div>
                    <select name="size" id="size">
                      <option value="unico">Tamanho único</option>
                      <option value="P">P</option>
                      <option value="M">M</option>
                      <option value="G">G</option>
                      <option value="GG">GG</option>
                    </select>
                  </div>
                  <div>
                    <FiPlusCircle size={30} />
                    <p>1</p>
                    <FiMinusCircle size={30} />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <MdDeleteForever size={35} />
                </div>
                <div className="full-price">
                  <p>R$ 30,00</p>
                </div>
                <div className="discount-price">
                  <p >R$ 25,00</p>
                </div>
              </div>
            </div>
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
