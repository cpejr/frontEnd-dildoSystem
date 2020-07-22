import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from '@material-ui/core'

import {LoginContext} from '../../Contexts/LoginContext';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

function Login() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState();
    const history = useHistory();

    async function handleLogin(e, setLoggedIn) {
        e.preventDefault();

        try {
            const response = await api.post('login', { email, password: passwd });

            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userType', response.data.user.type);
            localStorage.setItem('accessToken', response.data.accessToken);

            setLoggedIn(true);

            history.push("/admin");
        } catch (err) {
            setError(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
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
                                (<Button className="button" type="submit" variant="contained" color="primary" onClick={e => handleLogin(e, context.setLoggedIn)}> Entrar </Button>)
                            }
                        </LoginContext.Consumer>
                        
                    </div>
                    <Link className="link" to="/register">
                        <Button className="button" type="submit" color="primary" variant="outlined"> Cadastrar </Button>
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default Login;