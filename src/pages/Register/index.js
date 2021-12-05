import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, MenuItem, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

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
    const [type, setType] = useState('retailer');
    const [typeError, setTypeError] = useState();
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState();
    const [birthdate, setBirthdate] = useState('');
    const [birthdateError, setBirthdateError] = useState();
    const [phonenumber, setPhonenumber] = useState('');
    const [phonenumberError, setPhonenumberError] = useState();

    const history = useHistory();

    function validateFields() {
        function validateEmpty(value, setError, error) {
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
        } else if (password.length < 6) {
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


        if (phonenumber.trim().length < 1) {
            setPhonenumberError('Esse campo não pode estar vazio')
            return false;
        }
        if (phonenumberError) setPhonenumberError();

        return (true);
    };

    async function handleRegister(e) {
        e.preventDefault();
        let phone = phonenumber.replace(/\D/g, '');
        let ucpf = cpf.replace(/\D/g, '');
        if (validateFields()) {
            const data = {
                name,
                email,
                password,
                type,
                cpf: ucpf,
                birthdate,
                phonenumber: phone,
            };

            try {
                await api.post('/user', data);

                notification.open({
                    message: 'Sucesso!',
                    description:
                        'Cadastro realizado com sucesso.',
                    className: 'ant-notification',
                    top: '100px',
                    icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
                    style: {
                        width: 600,
                    },
                });

                history.push('/login');

            } catch (err) {
                console.error(err);
                notification.open({
                    message: 'Erro!',
                    description:
                        'Erro ao cadastrar usuário.',
                    className: 'ant-notification',
                    top: '100px',
                    icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
                    style: {
                        width: 600,
                    },
                });
            }
        }

    }

    function telefone(telefone) {
        telefone = telefone.replace(/\D/g, "")
        telefone = telefone.replace(/^(\d\d)(\d)/g, "($1) $2")
        telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2")
        setPhonenumber(telefone);
    }

    function cpfMask(cpf_cnpj) {
        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
        cpf_cnpj = cpf_cnpj.replace(/^(\d\d\d)(\d)/g, "$1.$2")
        cpf_cnpj = cpf_cnpj.replace(/(\d{3})(\d)/, "$1.$2")
        cpf_cnpj = cpf_cnpj.replace(/(\d{3})(\d)/, "$1-$2")
        if (cpf_cnpj.length > 13) {
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cpf_cnpj = cpf_cnpj.replace(/^(\d\d)(\d)/g, "$1.$2")
            cpf_cnpj = cpf_cnpj.replace(/(\d{3})(\d)/, "$1.$2")
            cpf_cnpj = cpf_cnpj.replace(/(\d{3})(\d)/, "$1/$2")
            cpf_cnpj = cpf_cnpj.replace(/(\d{4})(\d)/, "$1-$2")
        }
        setCpf(cpf_cnpj);
    }

    return (
        <div className="register-container">
            <div className="content">
                <Link className="back-link" to="/login">
                    <FiArrowLeft size={20} color="#a17402" />
                         Login
                    </Link>
                <form>
                    <section className="form">
                        <h1>CADASTRO</h1>
                        <div className="line mb-4" />
                        <div className="d-flex flex-column w-100 h-100">
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
                            <div className="d-flex flex-row">
                                <TextField
                                    className="input-register"
                                    variant="outlined"
                                    label="CPF/CNPJ"
                                    type="text"
                                    value={cpf}
                                    onChange={e => setCpf(e.target.value)}
                                    error={cpfError}
                                    helperText={cpfError}
                                    onKeyPress={(e) => cpfMask(e.target.value)}
                                />
                                <TextField
                                    className="input-register"
                                    id="select"
                                    label="Tipo"
                                    variant="outlined"
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
                            <div className="d-flex flex-row">
                                <TextField
                                    className="input-register"
                                    variant="outlined"
                                    id="date"
                                    label="Data de Nascimento"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    id="phone"
                                    value={phonenumber}
                                    onChange={e => setPhonenumber(e.target.value)}
                                    error={phonenumberError}
                                    helperText={phonenumberError}
                                    onKeyPress={(e) => telefone(e.target.value)}
                                />

                            </div>

                            <FormControlLabel
                                value="false"
                                control={<Checkbox color="default" />}
                                label={<div><span>Aceito os </span><Link to={"/conditions"} target="_blank">termos de uso</Link><span> e a </span><Link to={"/conditions"} target="_blank">política de privacidade</Link></div>}
                                labelPlacement="end"
                            />
                            <br></br>

                            <Button className="button" type="submit" variant="contained" color="primary" onClick={(e) => handleRegister(e)}> Cadastrar </Button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}

export default Register;
