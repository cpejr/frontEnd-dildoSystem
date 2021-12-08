import React, { useEffect, useState } from 'react';
import './styles.css';

import api from '../../services/api';

const OrderArray = function (props) {
  const [sub, setSub] = useState(undefined);

  const accessToken = localStorage.getItem('accessToken');
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get(`/subproductsId/${props.produto.subproduct_id}`, config).then((res) => {
      setSub(res.data[0]);
    });
  }, []);
  return (
    <div className="order-table">
      <div className="order-product-name">
        {props.produto.name}
        {' '}
        {sub ? `de ${sub.name}` : <div />}
      </div>
      <div className="order-product-quantity">{props.produto.product_quantity}</div>
      <div className="order-product-unityPrice">{`R${Number(props.produto.price).toFixed(2)}`}</div>
      <div className="order-product-price">{`R${Number(props.produto.product_quantity * props.produto.price).toFixed(2)}`}</div>
    </div>
  );
};

export default OrderArray;
