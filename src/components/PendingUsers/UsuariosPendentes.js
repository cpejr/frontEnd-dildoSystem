import React from "react";
import api from '../../services/api';

import './styles.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function UsuariosPendentes(props) {

  const id = props.pendingusers.id;

  const accessToken = localStorage.getItem('accessToken')

  const config = {
    headers: { 'authorization': `Bearer ${accessToken}` },
  }

  async function handleAproved(e) {

    try {

      await api.put('/user/' + id, { "user_status": 'approved' }, config);

      notification.open({
        message: 'Sucesso!',
        description:
          'Usuário aprovado com sucesso.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
      props.setUpdate(!props.update);


    } catch (err) {
      console.error(err);
      notification.open({
        message: 'Erro!',
        description:
          'Erro ao atualizar status do usuário.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  async function handleDenied(e) {

    try {

      await api.put('/user/' + id, { "user_status": 'refused' }, config);

      notification.open({
        message: 'Sucesso!',
        description:
          'Usuário negado com sucesso.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
      props.setUpdate(!props.update);

    } catch (err) {
      console.error(err);
      notification.open({
        message: 'Erro!',
        description:
          'Erro ao atualizar status do usuário.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
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