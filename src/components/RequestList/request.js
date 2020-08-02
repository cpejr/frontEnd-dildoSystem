import React from "react";
import "./styles.css";

function RequestArray(props) {
  return (
    <div className="request-data">
      <div className="request-number">{props.produto.requestNumber}</div>
      <div className="request-name">{props.produto.name}</div>
      <div className="request-quantity">{props.produto.quantity}</div>
      <div className="request-product-price">{`R$${Number(props.produto.productPrice).toFixed(2)}`}</div>
      <div className="request-total-price">{`R$${Number((props.produto.productPrice*props.produto.quantity)+props.produto.delivery).toFixed(2)}`}</div>
      <div className="request-delivery">{props.produto.delivery}</div>
      <div className="request-deadline">{props.produto.deadline}</div>
    </div>
  );
}

export default RequestArray;