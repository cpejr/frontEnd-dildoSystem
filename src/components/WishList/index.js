import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import ImageLoader from 'react-loading-image';
import loading from '../../images/Loading.gif';

import api from "../../services/api";
import cart from "../../services/cart"
import urlAWS from '../../services/imagesAWS';

import { MdDeleteForever } from "react-icons/md";
import { LoginContext } from "../../Contexts/LoginContext";
import { useCart } from '../../Contexts/CartContext';
import { notification } from "antd";

import { AiOutlineCheckCircle } from 'react-icons/ai';


export default function WishList(props) {
  const [list, setList] = useState([]);

  const { addItem } = useCart();

  const userInfo = useContext(LoginContext);

  const newToken = localStorage.getItem("accessToken");
      const config = {
        headers: { authorization: `Bearer ${newToken}` },
      };

  useEffect(() => {
      api.get(`userwishlist/${userInfo.id}`, config).then(response => {        
        setList(response.data)
      })
  }, [userInfo, list])

  const handleDeleteClick = (product_id) => {
    const newToken = localStorage.getItem("accessToken");
      const config = {
        headers: { authorization: `Bearer ${newToken}` },
        data: { user_id: userInfo.id ,product_id  }
      };
    api.delete('userwishlist', config).then(response => {
    })
  }

  function notifi() {
    notification.open({
      message: 'Sucesso!',
      description:
          'O produto foi adicionado ao carrinho.',
      className: 'ant-notification',
      top: '100px',
      icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
      style: {
          width: 600,
      },
  });
  }


  return (
    <div className="wish-all">
      <h4>Lista de Desejos</h4>
      {list.map(products => (

        <div className="wish-container" key={products.id}>
          <div className="wish-data">
            <div className="wish-card">
              <div className="wish-img">
              <ImageLoader
                  src={`${urlAWS}/${products.image_id}`}
                  loading={() => <img src={loading} alt="Loading..." />}
                  error={() => <div>Error</div>} />
              </div>
              <div className="wish-card-text">
                <h4>{products.name}</h4>
                <div>
                  {
                    (products.on_sale_client && products.on_sale_wholesaler) ?
                    <div>
                      <p>{new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(products.client_price)}</p>
                      <strong>{new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(products.client_sale_price)}</strong>
                    </div>
                    :
                    <strong>{new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(products.client_sale_price)}</strong>
                  }
                </div>
                <div className="wish-text"></div>
              </div>
              <div className="wish-button-area">
                <button className="delete-button" onClick={() => handleDeleteClick(products.id)}>
                  <MdDeleteForever className="wish-delete" size={30} />
                </button>
                <button className="wish-button" onClick={(e) => { addItem(products.id, 1, products.subproducts); notifi(); }} >Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>

      ))}
    </div>
  );
}
