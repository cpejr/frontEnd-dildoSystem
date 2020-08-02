import React from "react";
import "./styles.css";

import { MdDeleteForever } from "react-icons/md";

export default function WishList() {
  return (
    <div className="wish-all">
      <h4>Lista de Desejos</h4>
      <div className="wish-container">
        <div className="wish-data">
          <div className="wish-card">
            <div className="wish-img"></div>
            <div className="wish-card-text">
              <h4>Álcool em Gel - Alcooss - 50ml</h4>
              <p>R$15,00</p>
              <strong>R$10,00</strong>
              <div>
                <MdDeleteForever className="delete" size={30} /> 
              </div>
              <div className="wish-text"></div>
            </div>
            <button className="wish-button">
                Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
