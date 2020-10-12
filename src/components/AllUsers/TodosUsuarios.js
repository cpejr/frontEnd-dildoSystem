import React, { useState, useEffect } from "react";
import api from '../../services/api';

import './styles.css';

import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogActions = withStyles((theme) => ({
    root: {
        marginTop: 470,
        padding: theme.spacing(2),
        marginBottom: 0,
    },
}))(MuiDialogActions);

const DialogContent = withStyles((theme) => ({
    root: {
        padding: 0,
        marginLeft: 0,
        marginRight: 100,
        height: 220
    },
}))(MuiDialogContent);

export default function UsuariosPendentes(props) {

    const [id, setid] = useState();
    const [open, setOpen] = useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
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
            alert(`Alteração concluída!`, response);
        } catch (err) {
            console.log(JSON.stringify(err));
            console.log(err.response);
            alert("Update error");
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
                            // fullWidth={fullWidth}
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
                                                {/* <button className="dropbtn-">
                                                {status} <KeyboardArrowDownIcon />
                                                <div className="dropdown-content-">
                                                    
                                                    <div className="dropdownLinks-">
                                                        <button
                                                            className="dropdownCont"
                                                            onClick={(e) => handleClickDrop(e)}
                                                            value={"pendding"}>
                                                            approved
                                                </button>
                                                        <button
                                                            className="dropdownCont"
                                                            onClick={(e) => handleClickDrop(e)}
                                                            value={"pendding"}>
                                                            pending
                                                </button>
                                                        <button
                                                            className="dropdownCont"
                                                            onClick={(e) => handleClickDrop(e)}
                                                            value={"removed"}>
                                                            removed
                                                </button>
                                                    </div>
                                                </div>
                                            </button> */}
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