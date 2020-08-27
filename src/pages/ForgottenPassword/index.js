import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'

import api from '../../services/api';

import '../../global.css';
import './styles.css';

function ForgottenPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('forgottenPassword', { email });
      setError('');
      setSuccess('E-mail enviado');

    } catch (err) {
      setError("Usuário não encontrado")
      console.log(err.response.data.notification);
    }

  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="return-buttons">
          <Link className="back-link" to="/login">
          <FiArrowLeft size={20} color="#a17402" />
           Login
        </Link>

        <Link className="back-link" to="/">
          <FiShoppingBag size={20} color="#a17402" />
           Loja
        </Link>
        </div>
        
        <section className="form">
          <h1>Esqueci minha senha</h1>
          <div className="line" />
          <form className="forgottenPasswordForm" onSubmit={handleSubmit}>

            <TextField
              className="input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiMail size={20} />
                  </InputAdornment>)
              }}
              placeholder="E-mail"
              variant="outlined"
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
            />




            <Button className="button" type="submit" color="primary" variant="contained"> Enviar e-mail de recuperação </Button>
            {error && <p className="errortext">
              {error}
            </p>}
            {success && <p className="successText">
              {success}
            </p>}
          </form>
        </section>
      </div>
    </div>
  );
}

export default ForgottenPassword;