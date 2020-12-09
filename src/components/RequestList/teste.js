import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function RequestBody(props) {
  return props.products.map((product) => {
    return (
      <div>
        <strong className="request-name">{product.name}</strong>
        <p>
          {`R$ ${(product.price)}`}
        </p>
        <p>
          Quantidade:{product.product_quantity}
        </p>
      </div>
    );
  });
}

function MainRequest(props) {
  return (
      <div>
        <div className="request-order-id">
          <h4 className="request-number">Pedido</h4>
          <p>{props.order.id}</p>
        </div>
        <div className="request-row">
        <div className="request-column-1">
          <div className="request-data21">
            <RequestBody products={props.order.products} />
          </div>
          <div className="request-data31">
            <div className="request-product-price">{`Subtotal: R$${Number(
              props.order.totalPrice
            ).toFixed(2)}`}</div>
            
          </div>
        </div>

        <div className="request-column-2">
        <div className="request-data22">
            <div className="request-deadline">
              {`Previsão de entrega:${props.order.delivery_time == 1 ? String(props.order.delivery_time) + "dia útil" : String(props.order.delivery_time) + "dias úteis"}`}
              
            </div>
          </div>
          <div className="request-data32">
          <div className="request-delivery">{`Valor do frete: R$${Number(
                props.order.track_price
              ).toFixed(2)}`}</div>
          <div className="request-total-price">{`Valor total do pedido: R$${Number(
              props.order.totalPrice + props.order.track_price
            ).toFixed(2)}`}</div>
            <div className="buttons-area">
              {/* <button className="fiscalnote">Nota Fiscal</button> */}
              <Link
                to={{
                  pathname: `/user/requestdetails/${props.order.id}`,
                  state: props,
                }}
              >
                <button className="requestdetails">Detalhes do Pedido</button>
              </Link>
            </div>
            
          </div>
        </div>
        </div>
      </div>
  );
}

export default MainRequest;
