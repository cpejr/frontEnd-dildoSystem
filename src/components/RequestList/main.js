import React, {useState, useEffect, useContext} from "react";
import "./styles.css";

function MainRequest(props) {
  
  return (
    <div className="request-data">
      <div className="request-number">{`Pedido nº${Number(
        props.produto.id
      )}`}</div>
      <div className="request-dataImg">{props.produto.products.image_id}</div>
      <div className="request-data-all">
      <div className="request-data2">
      <div className="request-data21">
      <div className="request-name">{props.produto.products[0]['name']}</div>
      </div>
      <div className="request-data22">
      <div className="request-deadline">{`Previsão de entrega: até ${String(
        props.produto.deadline
      )}`}
      <div className="request-delivery">{`Frete: R$${Number(
        props.produto.track_price
      ).toFixed(2)}`}</div>
      </div>
      </div>
      </div>
      <div className="request-data3">
      <div className="request-data31">
      <div className="request-quantity">{`Quantidade:${Number(
        props.produto.products[0]['product_quantity']
      )}`}</div>
      <div className="request-product-price">{`Valor total do produto: R$${Number(
        props.produto.totalPrice
      ).toFixed(2)}`}</div>
      </div>
      <div className="request-data32">
        <div className="buttons-area">
      <button className="fiscalnote">Nota Fiscal</button>
      <button className="requestdetails">Detalhes do Pedido</button>
      </div>
      <div className="request-total-price">{`Valor total da compra: R$${Number(
        props.produto.totalPrice + props.produto.track_price
      ).toFixed(2)}`}</div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default MainRequest;
