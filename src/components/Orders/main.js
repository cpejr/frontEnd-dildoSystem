import React from "react";
import "./styles.css";
import PendingOrders from "../../pages/PendingOrders";
import OrderArray from "./order.js";



function Main(props) {
  return (

<div className="order-all">
      <h4>Atualize o pedido</h4>
      <div className="order-container">
        <div className="order-data">
          <div className="order-item">
            <strong>Nome do cliente:</strong>
  <p>{props.pedido.user.name}</p>
          </div>
          <div className="order-item">
            <strong>E-mail:</strong>
            <p>arthur2@gmail.com</p>
          </div>
          <div className="order-item">
            <strong>Tipo de usuário:</strong>
  <p>{props.pedido.user.type}</p>
          </div>
          <div className="order-item">
            <strong>Data de compra:</strong>
            <p>{props.pedido.created_at}</p>
          </div>
        </div>
        <h4 id="orderdetails">Detalhes do pedido</h4>
        <div className="order-details">
          <div className="order-header">
            <div className="order-product-name">Nome do produto</div>
            <div className="order-product-quantity">Quantidade</div>
            <div className="order-product-unityPrice">Valor unitário</div>
            <div className="order-product-price">Valor</div>
          </div>
          {props.pedido.products.map((produto, index) => (
        <OrderArray key={`produto-${index}`} produto={produto} />
      ))}
        </div>
        <div className="order-delivery">
          <div className="order-value">
            <div className="order-request-value">
              Valor total dos produtos: R${`R$${Number(props.pedido.totalPrice).toFixed(2)}`}
            </div>
            <div className="order-request-value">Frete: R$20,00</div>
            <div className="order-request-value">
              Valor total da compra: R$110,00
            </div>
          </div>
          <label className="order-label">
            Status do pedido
            <select className="order-select" >
              <option>Selecionar</option>
              <option>Aguardando pagamento</option>
              <option>Pagamento aprovado</option>
              <option>Pedido enviado</option>
              <option>Pedido em trânsito</option>
              <option>Pedido entregue</option>
            </select>
          </label>
          <label className="order-label">
            Forma de entrega
            <div className="order-mode">Sedex</div>
          </label>
          <label className="order-label">
            Código de rastreio
            <input className="order-track"></input>
          </label>
        </div>
        <div className="order-save-button">
          <button className="order-button">Enviar Alterações</button>
        </div>
      </div>
    </div>
      );
    }
    
    export default Main;