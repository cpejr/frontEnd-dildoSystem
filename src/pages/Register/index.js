import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Select, MenuItem, InputAdornment, Button } from '@material-ui/core';

import api from '../../services/api';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            type,
            cpf,
            birthdate,
            zipcode,
            phonenumber,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
        };

        try {
            const response = await api.post('/register', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/login');

        } catch (err) {
            alert('Erro ao cadastrar usuario!');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <h1>CADASTRO</h1>
                <div className="line" />

                <form onSubmit={handleRegister}>
                    <TextField
                        variant="outlined"
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />


                    <TextField
                        id="select"
                        label="Tipo"
                        variant="outlined"
                        value="20"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        select>
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                    </TextField>

                    <TextField
                        variant="outlined"
                        placeholder="CPF"
                        type="number"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        type="date"
                        placeholder="Data de Aniversario"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="CEP"
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="Telefone"
                        type="tel"
                        value={phonenumber}
                        onChange={e => setPhonenumber(e.target.value)}
                    />

                    <div className="input-group">
                        <TextField
                            variant="outlined"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <TextField
                            variant="outlined"
                            placeholder="Bairro"
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            placeholder="Rua"
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <TextField
                            variant="outlined"
                            placeholder="Numero"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            placeholder="Complemento"
                            value={complement}
                            onChange={e => setComplement(e.target.value)}
                        />
                    </div>

                    <Button className="button" type="submit" variant="contained" color="primary" onClick={handleRegister}> Cadastrar </Button>

                </form>

                <Link className="back-link" to="/login">
                    <FiArrowLeft size={20} color="#a17402" />
                         Login
                </Link>
            </div>
        </div>
    );
}

export default Register;