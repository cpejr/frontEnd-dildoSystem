import React from 'react';

import api from '../../../services/api';

import Pedido from './Pedido'
import './styles.css';

const pedidos = [
  {
    nome: 'Jonas',
    email: 'jonas@jonas.com',
    userType: 'varejista',
    data: '11/05/2020',
    valor: 'R$ 100,00',
    status: 'Pago'
  },
  {
    nome: 'Jonas',
    email: 'jonas@jonas.com',
    userType: 'varejista',
    data: '11/05/2020',
    valor: 'R$ 100,00',
    status: 'Pendente'
  },
  {
    nome: 'Jonas',
    email: 'jonas@jonas.com',
    userType: 'varejista',
    data: '11/05/2020',
    valor: 'R$ 100,00',
    status: 'Postado'
  }
];

function Main() {

  return (
    <div className="main-container">
      <h4 className="titulo">Dashboard</h4>
      <div className="farol">
        <div className="pendentes">
          <h4>Pedidos pendentes:</h4>
          <h3>5</h3>
        </div>
        <div className="acabando">
          <h4>Produtos com pouco estoque:</h4>
          <h3>10</h3>
        </div>
        <div className="aguardando-aprovacao">
          <h4>Usuários aguardando aprovação</h4>
          <h3>2</h3>
        </div>
      </div>
    
      <div className="pedidos-pendentes">
        <h4 className="titulo">Pedidos pendentes</h4>
        <div className="tabela">
          <div className="cabecalho">
            <div className="nome">Nome</div>
            <div className="email">E-mail</div>
            <div className="user-type">Tipo de usuário</div>
            <div className="data">Data de compra</div>
            <div className="valor">Valor do pedido</div>
            <div className="status">Status</div>
          </div>
          {pedidos.map((pedido, index) => <Pedido key={`pedido-${index}`} pedido={pedido}/>)}
        </div>
      </div>

    </div>
  );
}

export default Main;