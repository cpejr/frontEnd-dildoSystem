import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "../../services/api";

import { MdDeleteForever } from "react-icons/md";

export default function WishList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('userwishlist').then(response => {
      setList(response.data);
      console.log(response.data)
    })
  }, [])


  return (
    <div className="wish-all">
      <h4>Lista de Desejos</h4>
      {list.map(products => (

        <div className="wish-container">
          <div className="wish-data">
            <div className="wish-card">
              <div className="wish-img"></div>
              <div className="wish-card-text">
                <h4>{products.user_id}</h4>
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

      ))}
    </div>
  );
}
