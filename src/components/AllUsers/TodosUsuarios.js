import React, { useState } from "react";
import api from '../../services/api';

import './styles.css';

import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";


const DialogContent = withStyles((theme) => ({
    root: {
        padding: 0,
        marginLeft: 0,
        marginRight: 100,
        height: 220
    },
}))(MuiDialogContent);

export default function UsuariosPendentes(props) {

    const [open, setOpen] = useState(false);

    const [maxWidth, setMaxWidth] = React.useState('lg');

    const accessToken = localStorage.getItem('accessToken')

    const [status, setStatus] = useState(props.todosUsuarios.user_status);

    const config = {
        headers: { 'authorization': `Bearer ${accessToken}` },
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickDrop = (e) => {
        console.log(e.target.value)
        setStatus(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = { user_status: status };

        try {
            const response = await api.put(`user/${props.todosUsuarios.id}`, data, config)
            notification.open({
                message: 'Sucesso!',
                description:
                  'Alteração concluída.',
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
                style: {
                  width: 600,
                },
              });
        } catch (err) {
            console.log(JSON.stringify(err));
            console.error(err.response);
            notification.open({
                message: 'Erro!',
                description:
                  'Erro na atualização.',
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
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
                        <p>{props.todosUsuarios.name}</p>
                    </div>
                    <div className="pending-users-item">
                        <strong>CPF/CNPJ:</strong>
                        <p>{props.todosUsuarios.cpf}</p>
                    </div>
                    <div className="pending-users-item">
                        <strong>E-mail:</strong>
                        <p>{props.todosUsuarios.email}</p>
                    </div>
                    <div className="pending-users-item">
                        <strong>Telefone:</strong>
                        <p>{props.todosUsuarios.phonenumber}</p>
                    </div>
                    <div className="pending-users-item">
                        <strong>Tipo:</strong>
                        <p>{props.todosUsuarios.type}</p>
                    </div>
                </div>
                <div className="pending-users-button-area">
                    <div>
                        <CreateIcon className="" onClick={handleClickOpen} />
                        <Dialog
                            maxWidth={maxWidth}
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}>
                            <DialogContent dividers className="contentDialog">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-wrapper-user">
                                        <div className="pending-users-item">
                                            <strong>Nome:</strong>
                                            <p>{props.todosUsuarios.name}</p>
                                        </div>
                                        <div className="pending-users-item">
                                            <strong>Status:</strong>
                                            <div className="dropdown-">
                                                <select
                                                    name="cars"
                                                    id="cars"
                                                    value={status} onChange={handleClickDrop}
                                                >
                                                    <option value="approved" >approved</option>
                                                    <option value="pending" >pending</option>
                                                    <option value="removed" >refused</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="submit-user-btn">
                                            <button className="status-sub-btn" type="submit" >
                                                ALTERAR
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </ Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}