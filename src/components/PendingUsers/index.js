import React from "react";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import UsuariosPendentes from './UsuariosPendentes';
import "./styles.css";

const usuariospendentes = [
  {
    name: 'Alceu Carvalho de Pinto',
    cpf: '121.241.322-54',
    email: 'alcefe@gmail.com',
    telefone: '(31) 9134514231'
  },
  
  {
    name: 'Ângela de Lima Siqueira',
    cpf: '141.211.312-76',
    email: 'adqfgr@msn.com',
    telefone: '(31) 931233321'
  },
]

export default function PendingUsers() {
  return (
    <div className="pending-users-container">
      <h4>Usuários Pendentes</h4>
      <div className="pending-users-content">
        {usuariospendentes.map((pendingusers, index) => <UsuariosPendentes key ={`pendingusers-${index}`} pendingusers={pendingusers} />)}
      </div>
    </div>
  );
}
