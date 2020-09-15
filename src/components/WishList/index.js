import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import ImageLoader from 'react-loading-image';
import loading from '../../images/Loading.gif';

import api from "../../services/api";

import { MdDeleteForever } from "react-icons/md";
import { LoginContext } from "../../Contexts/LoginContext";

export default function WishList(props) {
  const [list, setList] = useState([]);

  const userInfo = useContext(LoginContext);
  console.log(userInfo);

  useEffect(() => {
    const newToken = localStorage.getItem("accessToken");
      const config = {
        headers: { authorization: `Bearer ${newToken}` },
      };
      api.get(`userwishlist/${userInfo.id}`, config).then(response => {        
        console.log(` essa eh a response${response.data}`)
        setList(response.data)
      })
      
    
  }, [])


  return (
    <div className="wish-all">
      <h4>Lista de Desejos</h4>
      {list.map(products => (

        <div className="wish-container" key={products.id}>
          <div className="wish-data">
            <div className="wish-card">
              <div className="wish-img">
              <ImageLoader
                  src={`https://docs.google.com/uc?id=${products.image_id}`}
                  loading={() => <img src={loading} alt="Loading..." />}
                  error={() => <div>Error</div>} />
              </div>
              <div className="wish-card-text">
                <h4>{products.name}</h4>
                <div>
                  <p>{products.client_price}</p>
                  <strong>{products.client_sale_price}</strong>
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
