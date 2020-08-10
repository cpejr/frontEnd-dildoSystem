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
              <div>
                <p>R$15,00</p>
                <strong>R$10,00</strong>
              </div>
              <div className="wish-text"></div>
            </div>
            <div className="wish-button-area">
              <MdDeleteForever className="wish-delete" size={30} />
              <button className="wish-button">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
