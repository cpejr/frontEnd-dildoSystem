import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Select, MenuItem, InputAdornment, Button } from '@material-ui/core';

import api from '../../services/api';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

function Register() {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState();
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState();
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState();
    const [birthdate, setBirthdate] = useState('');
    const [birthdateError, setBirthdateError] = useState();
    const [zipcode, setZipcode] = useState('');
    const [zipcodeError, setZipcodeError] = useState();
    const [phonenumber, setPhonenumber] = useState('');
    const [phonenumberError, setPhonenumberError] = useState();
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState();
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState();
    const [neighborhood, setNeighborhood] = useState('');
    const [neighborhoodError, setNeighborhoodError] = useState('');
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState();
    const [number, setNumber] = useState('');
    const [numberError, setNumberError] = useState();
    const [complement, setComplement] = useState('');
    // const [complementError, setComplementError] = useState();


    const history = useHistory();

    function validateFields() {
        function validateEmpty(value, setError, error){
            if (value.trim().length < 1) {
                setError('Esse campo não pode estar vazio')
                return false;
            }
            if (error) setError();
            return true;
        }
        if (!validateEmpty(name, setNameError, nameError))
            return false; 

        if (email.trim().length < 1) {
            setEmailError('Esse campo não pode estar vazio')
            return false;
        }
        if (emailError) setEmailError();

        if (password.trim().length < 1) {
            setPasswordError('Esse campo não pode estar vazio')
            return false;
        }else if (password.length < 6){
            setPasswordError('A senha deve conter no mínimo 6 caracteres')
            return false;
        }
        if (passwordError) setPasswordError();

        if (!validateEmpty(type, setTypeError, typeError))
            return false;

        if (cpf.trim().length < 1) {
            setCpfError('Esse campo não pode estar vazio')
            return false;
        }
        if (cpfError) setCpfError();

        if (birthdate.trim().length < 1) {
            setBirthdateError('Esse campo não pode estar vazio')
            return false;
        }
        if (birthdateError) setBirthdateError();

        if (zipcode.trim().length < 1) {
            setZipcodeError('Esse campo não pode estar vazio')
            return false;
        }
        if (zipcodeError) setZipcodeError();

        if (phonenumber.trim().length < 1) {
            setPhonenumberError('Esse campo não pode estar vazio')
            return false;
        }
        if (phonenumberError) setPhonenumberError();

        if (!validateEmpty(state, setStateError, stateError))
            return false;

        if (!validateEmpty(city, setCityError, cityError))
            return false;

        if (!validateEmpty(neighborhood, setNeighborhoodError, neighborhoodError))
            return false;
        
        if (!validateEmpty(street, setStreetError, streetError))
            return false;

        if (number.trim().length < 1) {
            setNumberError('Esse campo não pode estar vazio')
            return false;
        }
        if (numberError) setNumberError();
        return (true);
    };

    async function handleRegister(e) {
        e.preventDefault();
        if (validateFields()) {
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
                const response = await api.post('/user', data);

                alert(`Seu ID de acesso: ${response.data.id}`);

                history.push('/login');

            } catch (err) {
                alert('Erro ao cadastrar usuario!');
            }
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
                            error={nameError}
                            helperText={nameError}
                        />

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={emailError}
                            helperText={emailError}
                        />

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={passwordError}
                            helperText={passwordError}
                        />
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="CPF"
                                type="number"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                error={cpfError}
                                helperText={cpfError}
                            />
                            <TextField
                                className="input-register"
                                id="select"
                                label="Tipo"
                                variant="outlined"
                                value="20"
                                style={{ width: 130 }}
                                value={type}
                                error={typeError}
                                helperText={typeError}
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
                                error={birthdateError}
                                helperText={birthdateError}
                            />

                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Telefone"
                                type="tel"
                                value={phonenumber}
                                onChange={e => setPhonenumber(e.target.value)}
                                error={phonenumberError}
                                helperText={phonenumberError}
                            />
                        </div>

                        <TextField
                            className="input-register"
                            variant="outlined"
                            label="CEP"
                            value={zipcode}
                            onChange={e => setZipcode(e.target.value)}
                            error={zipcodeError}
                            helperText={zipcodeError}
                        />
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Rua"
                                // style={{ width: 330 }}
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                error={streetError}
                                helperText={streetError}
                            />
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Numero"
                                // style={{ width: 90 }}
                                type="number"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                error={numberError}
                                helperText={numberError}
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
                                error={neighborhoodError}
                                helperText={neighborhoodError}
                            />
                        </div>
                        <div className="d-flex flex-row w-100">
                            <TextField
                                className="input-register"
                                variant="outlined"
                                label="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                error={cityError}
                                helperText={cityError}
                            />
                            <TextField
                                className="input-register"
                                id="select"
                                variant="outlined"
                                label="UF"
                                value={state}
                                error={stateError}
                                helperText={stateError}
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