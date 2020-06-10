 import React, { useState } from 'react';
 import { Link, useHistory } from 'react-router-dom';
 import {} from 'react-icons/fi'; // importando o feather icons caso precise usar os icones do react

import api from '../../services/api';

 import './styles.css';

function Login(){
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('login', { id }); //acho q tem q mudar id por accessToken
            
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('accessToken', response.data.id);
            
            console.log(response.data.name);
            history.push("products");
        } catch (err) {
            alert('Falha no Login, tente novamente!');
            console.log(err);
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                <h1>LOGIN</h1>
                    <input
                     placeholder="Email"
                     value ={id}
                     onChange={e => setId(e.target.value)}
                      />

                    <input
                     placeholder="Senha"
                     value ={passwd}
                     onChange={e => setPasswd(e.target.value)}
                      />

                    {/* <Link to="/esquecisenha">
                        Esqueci minha senha
                    </Link> */}
                    <button className="button" type="submit">Entrar</button>
                </form>
                <button className="button" type="submit">Cadastrar</button>
            </section>
        </div>
    );
 }

 export default Login;