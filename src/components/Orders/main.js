import React, { useState } from "react";
import "./styles.css";
import OrderArray from "./order.js";
import { formatDate } from '../FormatDate/index'
import api from '../../services/api';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

function Main(props) {
  const [newStatus, setnewStatus] = useState();
  const [newTrackNumber, setnewTrackNumber] = useState(props.pedido.track_number || "");

  const accessToken = localStorage.getItem('accessToken')

  const config = {
    headers: { 'authorization': `Bearer ${accessToken}` },
  }
  async function handleSubmit(e) {

    let engstatus;
    switch (newStatus) {
      case "Pedido Pendente":
        engstatus = "pending";
        break;
      case "Pedido Pago":
        engstatus = "paid";
        break;
      case "Pedido Enviado":
        engstatus = "mailed";
        break;
      case "Pedido Entregue":
        engstatus = "delivered";
        break;
      case "Pedido Cancelado":
        engstatus = "cancelled";
        break;
      default:
        break;
    }

    try {
      const response = await api.put(`order/${props.pedido.id}`, { order_status: engstatus, track_number: newTrackNumber }, config);
      notification.open({
        message: 'Sucesso!',
        description:
          'Pedido atualizado.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });

    } catch (err) {
      console.error(err);
      notification.open({
        message: 'Erro!',
        description:
          'Erro ao atualizar pedido.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  let status;
  switch (props.pedido.order_status) {
    case "pending":
      status = "Pedido Pendente";
      break;
    case "paid":
      status = "Pedido Pago";
      break;
    case "mailed":
      status = "Pedido Enviado";
      break;
    case "delivered":
      status = "Pedido Entregue";
      break;
    case "cancelled":
      status = "Pedido Cancelado";
      break;
    default:
      break;
  }
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
            <p>{props.pedido.user.email}</p>
          </div>
          <div className="order-item">
            <strong>Tipo de usuário:</strong>
            <p>{props.pedido.user.type}</p>
          </div>
          <div className="order-item">
            <strong>Data de compra:</strong>
            <p>{formatDate(props.pedido.created_at)}</p>
          </div>
          <div className="order-item">
            <strong>Rua:</strong>
            <p>{props.pedido.user.street}</p>
          </div>
          <div className="order-item">
            <strong>Número</strong>
            <p>{props.pedido.user.number}</p>
          </div>
          <div className="order-item">
            <strong>Bairro:</strong>
            <p>{props.pedido.user.neighborhood}</p>
          </div>
          <div className="order-item">
            <strong>Complemento:</strong>
            <p>{props.pedido.complement}</p>
          </div>
          <div className="order-item">
            <strong>Cidade:</strong>
            <p>{props.pedido.user.city}</p>
          </div>
          <div className="order-item">
            <strong>Esatado:</strong>
            <p>{props.pedido.user.state}</p>
          </div>
          <div className="order-item">
            <strong>CEP:</strong>
            <p>{props.pedido.user.zipcode}</p>
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
              Valor total dos produtos:{" "}
              {`R$${Number(props.pedido.totalPrice).toFixed(2)}`}
            </div>
            <div className="order-request-value">
              Frete: {`R$${Number(props.pedido.track_price).toFixed(2)}`}
            </div>
            <div className="order-request-value">
              Valor total da compra:{" "}
              {`R$${Number(
                props.pedido.track_price + props.pedido.totalPrice
              ).toFixed(2)}`}
            </div>
          </div>
          <label className="order-label">
            Status do pedido
            <select
              className="order-select"
              defaultValue={status}
              onChange={(e) => setnewStatus(e.target.value)}
            >
              <option>Selecionar</option>
              <option>Pedido Pendente</option>
              <option>Pedido Pago</option>
              <option>Pedido Enviado</option>
              <option>Pedido Entregue</option>
              <option>Pedido Cancelado</option>
            </select>
          </label>
          <label className="order-label">
            Forma de entrega
            <div className="order-mode">{props.pedido.track_type}</div>
          </label>
          <label className="order-label">
            Código de rastreio
            <input
              className="order-track"
              value={newTrackNumber}
              onChange={(e) => setnewTrackNumber(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="order-save-button">
          <button className="order-button" type="submit" onClick={handleSubmit}>
            Enviar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
