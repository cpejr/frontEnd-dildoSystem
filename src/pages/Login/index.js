import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { FiArrowLeft } from 'react-icons/fi';

import {LoginContext} from '../../Contexts/LoginContext';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

function Login() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState();
    const history = useHistory();

    const [changed, setChanged] = useState(false);

    useEffect(() => {
      if(changed) {
          history.push('/admin');
          setChanged(false);
      }
    }, [changed])

    async function handleLogin(e,  context) {
        e.preventDefault();

        try {
            const response = await api.post('login', { email, password: passwd });

            localStorage.setItem('accessToken', response.data.accessToken);

            const user = response.data.user;

            await Promise.all([
                context.setLoggedIn(true),
                context.setName(user.name),
                context.setId(user.id),
                context.setType(user.type),
                context.setAccessToken(response.data.accessToken),
            ]);
            setChanged(true);

        } catch (err) {
            setError(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <div className="login-container">
                          
            <div className="login-content">
            <Link className="back-link" to="/">
                    <FiArrowLeft size={20} color="#a17402" />
                         Loja
                    </Link>
                <form>
                <section className="form">
                    <h1>LOGIN</h1>
                    <div className="line" />
                    <div className="mt-4">
                       
                       
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
                        <TextField
                            className="input"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiLock size={20} />
                                    </InputAdornment>)
                            }}
                            variant="outlined"
                            placeholder="Senha"
                            value={passwd}
                            type="password"
                            onChange={e => setPasswd(e.target.value)}
                        />

                        {error && <p className="errortext">
                            {error}
                        </p>}
                        <LoginContext.Consumer>
                            {
                                context => 
                                (<Button className="button" type="submit" variant="contained" color="primary" onClick={e => handleLogin(e, context)}> Entrar </Button>)
                            }
                        </LoginContext.Consumer>
                        
                    </div>
                    
                    <Link className="link" to="/register">
                        <Button className="button" type="submit" color="primary" variant="outlined"> Cadastrar </Button>
                    </Link>
                    <Link className="link" to="/ForgottenPassword">
                        <Button className="button" type="submit" color="primary" variant="outlined"> Esqueci Minha Senha </Button>
                    </Link>
                </section>
                </form>
            </div>
        </div>
    );
}

export default Login;