import React from "react";
import "./styles.css";

function OrderArray(props) {
  return (
    <div className="order-table">
      <div className="order-product-name">{props.produto.name}</div>
      <div className="order-product-quantity">{props.produto.quantity}</div>
      <div className="order-product-unityPrice">{`R$${Number(props.produto.unity).toFixed(2)}`}</div>
  <div className="order-product-price">{`R$${Number(props.produto.unity*props.produto.quantity).toFixed(2)}`}</div>
    </div>
  );
}

export default OrderArray;