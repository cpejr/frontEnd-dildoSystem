import React, { useState, useEffect } from "react";
import api from '../../services/api';

import './styles.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export default function UsuariosPendentes(props) {
  
  const [id, setid] = useState(props.pendingusers.id);

  const accessToken = localStorage.getItem('accessToken')

  const config = {
      headers: { 'authorization': `Bearer ${accessToken}` },
  }

  async function handleAproved(e) {

    try {
      
      const response = await api.put('/user/' + id,{ "user_status": 'approved' }, config);

      alert(`Usuario Aprovado com sucesso`);
      props.setUpdate(!props.update);
  

    } catch (err) {
      console.err(err);
      alert('Erro ao atualizar status do usuario!');
    }
  }

  async function handleDenied(e) {

    try {
      
      const response = await api.put('/user/' + id,{ "user_status": 'refused' }, config);

      alert(`Usuario negado com sucesso`);
      props.setUpdate(!props.update);

    } catch (err) {
      console.err(err);
      alert('Erro ao atualizar status do usuario!');
    }
  }


  return (
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
            <p>{props.pendingusers.phonenumber}</p>
          </div>
        </div>
        <div className="pending-users-button-area">
          <CheckCircleIcon className="pending-users-accept-button" type="submit" onClick={handleAproved} />
          <CancelRoundedIcon className="pending-users-refuse-button" type="submit" onClick={handleDenied} />
        </div>
      </div>
    </div>
  )
}