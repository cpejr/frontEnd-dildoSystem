import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import UsuariosPendentes from './UsuariosPendentes';
import './styles.css';

export default function PendingUsers() {
  const [usuariospendentes, setusuariospendentes] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    api
      .get('users?user_status=pending', {
        headers: {
          authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((response) => {
        setusuariospendentes(response.data);
      });
  }, [update]);

  return (
    <div className="pending-users-container">
      <h4>Usuários Pendentes</h4>
      <div className="pending-users-content">
        {usuariospendentes.map((pendingusers, index) => (
          <UsuariosPendentes
            key={`pendingusers-${index}`}
            pendingusers={pendingusers}
            update={update}
            setUpdate={setUpdate}
          />
        ))}
      </div>
    </div>
  );
}
