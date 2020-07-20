import React from 'react';

import './styles.css';

function Pedido(props) {

  function createStatusBox(status) {
    switch (status.toLowerCase()) {
      case 'pago': {
        return <div className="status-box" style={{ backgroundColor: "#E4B53F" }}>PAGO</div>
      }
      case 'postado': {
        return <div className="status-box" style={{ backgroundColor: "#4BBC4C" }}>POSTADO</div>
      }
      case 'pendente': {
        return <div className="status-box" style={{ backgroundColor: "#BF3838" }}>PENDENTE</div>
      }
    }
  }

  return (
    <div>
      <hr />
      <div className="product-container">
        <div className="nome">{props.pedido.nome}</div>
        <div className="email">{props.pedido.email}</div>
        <div className="user-type">{props.pedido.userType}</div>
        <div className="data">{props.pedido.data}</div>
        <div className="valor">{props.pedido.valor}</div>
        <div className="status">{createStatusBox(props.pedido.status)}</div>
      </div>
    </div>


  )
}

export default Pedido;