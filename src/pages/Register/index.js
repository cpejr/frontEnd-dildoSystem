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
                <Link className="back-link" to="/login">
                    <FiArrowLeft size={20} color="#a17402" />
                         Login
                    </Link>
                <section className="form">
                    <h1>CADASTRO</h1>
                    <div className="line mb-4" />
                    <div className="d-flex flex-column w-100">
                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="CPF"
                                type="number"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                            <TextField
                                className="input-register"
                                id="select"
                                label="Tipo"
                                variant="outlined"
                                value="20"
                                style={{ width: 130 }}
                                value={type}
                                onChange={e => setType(e.target.value)}
                                select>
                                <MenuItem value="retailer">Varejista</MenuItem>
                                <MenuItem value="wholesaler">Atacadista</MenuItem>
                            </TextField>

                        </div>
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Data de Aniversario"
                                // type="date"
                                value={birthdate}
                                onChange={e => setBirthdate(e.target.value)}
                            />

                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Telefone"
                                type="tel"
                                value={phonenumber}
                                onChange={e => setPhonenumber(e.target.value)}
                            />
                        </div>

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="CEP"
                            value={zipcode}
                            onChange={e => setZipcode(e.target.value)}
                        />
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Rua"
                                // style={{ width: 330 }}
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                            />
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Numero"
                                // style={{ width: 90 }}
                                type="number"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Complemento"
                                value={complement}
                                onChange={e => setComplement(e.target.value)}
                            />

                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Bairro"
                                value={neighborhood}
                                onChange={e => setNeighborhood(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <TextField
                                className="input-register"
                                id="select"
                                variant="outlined"
                                label="UF"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                select>
                                <MenuItem value="AC">AC</MenuItem>
                                <MenuItem value="AL">AL</MenuItem>
                                <MenuItem value="AP">AP</MenuItem>
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="BA">BA</MenuItem>
                                <MenuItem value="CE">CE</MenuItem>
                                <MenuItem value="DF">DF</MenuItem>
                                <MenuItem value="ES">ES</MenuItem>
                                <MenuItem value="GO">GO</MenuItem>
                                <MenuItem value="MA">MA</MenuItem>
                                <MenuItem value="MT">MT</MenuItem>
                                <MenuItem value="MS">MS</MenuItem>
                                <MenuItem value="MG">MG</MenuItem>
                                <MenuItem value="PA">PA</MenuItem>
                                <MenuItem value="PB">PB</MenuItem>
                                <MenuItem value="PR">PR</MenuItem>
                                <MenuItem value="PE">PE</MenuItem>
                                <MenuItem value="PI">PI</MenuItem>
                                <MenuItem value="RJ">RJ</MenuItem>
                                <MenuItem value="RN">RN</MenuItem>
                                <MenuItem value="RS">RS</MenuItem>
                                <MenuItem value="RO">RO</MenuItem>
                                <MenuItem value="RR">RR</MenuItem>
                                <MenuItem value="SC">SC</MenuItem>
                                <MenuItem value="SP">SP</MenuItem>
                                <MenuItem value="SE">SE</MenuItem>
                                <MenuItem value="TO">TO</MenuItem>
                            </TextField>

                        </div>



                        <Button className="button" type="submit" variant="contained" color="primary" onClick={handleRegister}> Cadastrar </Button>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default Register;