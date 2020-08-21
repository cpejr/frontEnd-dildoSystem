import React from 'react';

import './styles.css';

function Pedido(props) {

  function createStatusBox(status) {
    switch (status.toLowerCase()) {
      case 'paid': {
        return <div className="status-box" style={{ backgroundColor: "#E4B53F" }}>PAGO</div>
      }
      case 'mailed': {
        return <div className="status-box" style={{ backgroundColor: "#4BBC4C" }}>POSTADO</div>
      }
      case 'pending': {
        return <div className="status-box" style={{ backgroundColor: "#BF3838" }}>PENDENTE</div>
      }
    }
  }

  return (
    <div>
      <hr />
      <div className="product-container">
        <div className="nome">{props.pedido.user.name}</div>
        <div className="email">teste@gmail.com</div>
        <div className="user-type">{props.pedido.user.type}</div>
        <div className="data">{props.pedido.created_at}</div>
        <div className="valor">{props.pedido.totalPrice}</div>
        <div className="status">{createStatusBox(props.pedido.order_status)}</div>
      </div>
    </div>


  )
}

export default Pedido;