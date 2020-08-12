import React from 'react';
import './styles.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export default function UsuariosPendentes(props){
    return(
        <div className="pending-users-content">
        <h5>Dados do Usuário</h5>
        <div className="pending-users-data">
          <div className="pending-users-info">
          <div className="pending-users-item">
            <strong>Nome:</strong>
            <p>{props.pendingusers.name}</p>
          </div>
          <div className="pending-users-item">
            <strong>CPF/CNPJ:</strong>
            <p>{props.pendingusers.cpf}</p>
          </div>
          <div className="pending-users-item">
            <strong>E-mail:</strong>
            <p>{props.pendingusers.email}</p>
          </div>
          <div className="pending-users-item">
            <strong>Telefone:</strong>
            <p>{props.pendingusers.telefone}</p>
          </div>
          </div>
          <div className="pending-users-button-area">
              <CheckCircleIcon className="pending-users-accept-button"/>
              <CancelRoundedIcon className="pending-users-refuse-button"/>
          </div>
        </div>
        </div>
    )
}