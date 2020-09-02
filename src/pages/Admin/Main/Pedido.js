import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import CreateIcon from '@material-ui/icons/Create';

function Pedido2(props) {

  function createStatusBox(status) {
    switch (status.toLowerCase()) {
      case 'paid': {
        return <div className="status-box" style={{ backgroundColor: "#E4B53F" }}> PAGO </div>
      }
      case 'mailed': {
        return <div className="status-box" style={{ backgroundColor: "#4BBC4C" }}> POSTADO </div>
      }
      case 'pending': {
        return <div className="status-box" style={{ backgroundColor: "#BF3838" }}> PENDENTE </div>
      }
    }
  }

  return (
<div className="orders-content">
  <h6>Dados do Pedido ID:{props.pedido.id}</h6>
<div className="orders-data">
  <div className="orders-info">
  <div className="orders-item">
    <strong>Nome:</strong>
    <p>{props.pedido.user.name}</p>
  </div>
  <div className="orders-item">
    <strong>E-mail</strong>
    <p>Olhar isso do email</p>
  </div>
  <div className="orders-item">
    <strong>Tipo de Usuario:</strong>
    <p>{props.pedido.user.type}</p>
  </div>
  <div className="orders-item">
    <strong>Data:</strong>
    <p>{props.pedido.created_at}</p>
  </div>
  <div className="orders-item">
    <strong>Valor:</strong>
    <p>R$ {props.pedido.totalPrice}</p>
  </div>
  <div className="orders-item">
    <strong>Status:</strong>
    <p>{createStatusBox(props.pedido.order_status)}</p>
  </div>
  <div className="orders-item">
    <strong>Editar:</strong>
    <Link to="/admin/pendingorder">
                    <CreateIcon size={20} color="#15425" />
                    </Link>
  </div>
  </div>

</div>
</div>

  )
}

export default Pedido2;