import React from "react";
import "./styles.css";
import { IoMdKey } from "react-icons/io";
import api from "../../services/api";
import {useEffect} from "react";
import useStateWithPromise from "../../Contexts/useStateWithPromise";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
    marginLeft: 0,
   
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);
  
export default function ProfileSettings(props, { id, className, fileName, onSubmit }) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwd, setPasswd] = React.useState("");
  //const [type, setType] = useState("");
  const [cpf, setCpf] = React.useState(0);
  //const [birthdate, setBirthdate] = useState(0);
  const [zipcode, setZipcode] = React.useState(0);
  const [phonenumber, setPhonenumber] = React.useState(0);
  const [state, setState] = React.useState(""); 
  const [city, setCity] = React.useState("");
  const [neighborhood, setNeighborhood] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState(0);
  const [complement, setComplement] = React.useState("");
  const [oldpass, setOldPass] = React.useState("");
  const [newpass, setNewPass] = React.useState("");

  const LoginContext = React.createContext({});
  const [accessToken, setAccessToken] = useStateWithPromise("");
  const [userId, setUserId] = useStateWithPromise(0);

  const [error, setError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [mopen, setMopen] = React.useState(false);
  const [xopen, setXopen] = React.useState(false);

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

const handleOpen = () => {
  setMopen(true);
}

const history = useHistory();
const [changed, setChanged] = React.useState(false);
const [location, setLocation] = React.useState(history.location);

const handleXopen = () => {
  setXopen(true);
}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMopen(false);
    setXopen(false);
  };

  useEffect(() => {
    if (changed) {
      history.push(location.pathname+location.search);
      setChanged(false);
    }
  }, [changed]);
  
  useEffect(() => {
    const newToken = localStorage.getItem("accessToken");
    if (newToken && !accessToken) {
      async function grabData() {
        const config = {
          headers: { authorization: `Bearer ${newToken}` },
        };
        const resp = await api.get("verify", config);

        if (resp.data.verified) {
          await Promise.all([
            setUserId(resp.data.user.id),
            setName(resp.data.user.name),
            setEmail(resp.data.user.email),
            setCpf(resp.data.user.cpf),
            setPhonenumber(resp.data.user.phonenumber),
            setState(resp.data.user.state),
            setCity(resp.data.user.city),
            setZipcode(resp.data.user.zipcode),
            setNeighborhood(resp.data.user.neighborhood),
            setStreet(resp.data.user.street),
            setNumber(resp.data.user.number),
            setComplement(resp.data.user.complement),
            setPassword(resp.data.user.password)
          ]);
        } 
      }
      grabData();
    }
  }, []);

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    
    let data;

    try {
      const response = await api.post("login", { email, password: passwd });
      const user = response.data.user;
      if (user) {
        data = {
          password: password,
          name: name
        }
      }
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
      alert("Senha incorreta");
    }

    if (data) {
      
      try {
        const response = await api.put(`user/${userId}`, data, {
            headers: {
              authorization: "Bearer " + localStorage.accessToken,
            }
          })
          alert(`Edição concluída`, response);
      } catch (err) {
        console.log(JSON.stringify(err));
        console.log(err.response);
      }

    }

    setPassword("");
    setPasswd("");

  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    
    let data = {};
    function addToData(key, value) {
      if (value !== undefined && value !== '') {
        data = {...data, [key]: value};
      }
    }


    addToData('name', name);
    addToData('email', email);
    addToData('cpf', cpf);
    addToData('zipcode', zipcode);
    addToData('phonenumber', phonenumber);
    addToData('state', state);
    addToData('city', city);
    addToData('neighborhood', neighborhood);
    addToData('street', street);
    addToData('number', number);
    addToData('complement', complement);
    
    try {
      const response = await api.put(`user/${userId}`, data, {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          }
        })
        alert(`Edição concluída`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.log(err.response);
      alert("Edição não pôde ser realizada");
    }
  
  }

  const handleDeleteUser = () => {
    api.delete(`user/${userId}`, {
      headers: {
        authorization: "Bearer " + localStorage.accessToken,
      }
    } ).then((response) => {
      console.log(response);
    })
    alert("Usuário deletado com sucesso!");
    history.push("/login");
  }
   
  
  return (
    <div className="settings-container">
      <h4>Meus Dados</h4>
      <div className="settings-content">
        <div className="settings-data">
          <div className="settings-info">
            <div className="settings-info-item">
              <strong>Nome</strong>
              <p>{name}</p>
            </div>
            <div className="settings-info-item">
              <strong>Email</strong>
              <p>{email}</p>
            </div>
            <div className="settings-info-item">
              <strong>CPF</strong>
              <p>{cpf}</p>
            </div>
            <div className="settings-info-item">
              <strong>Telefone</strong>
              <p>{phonenumber}</p>
            </div>
          </div>
        </div>
        <div className="settings-button-edit-area">
        <button className="settings-button" onClick={handleOpen}>
              <IoMdKey className="settings-key" size={20} />
              Alterar Senha
            </button>
            <Dialog open={mopen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form className="passEdit" onSubmit={handlePasswordSubmit}> 
        <DialogTitle id="form-dialog-title">Alterar senha</DialogTitle>
        <DialogContent> 
          <div className="settings-info-item-form">
              <strong>Digite a senha atual:</strong>
              <br></br>
              <input
                    type="password"
                    value={passwd}                
                    onChange={(e) => setPasswd(e.target.value)}
                  />
            </div>
            <div className="settings-info-item-form">
              <strong>Digite a senha nova:</strong>
              <br></br>
              <input
                    type="password"
                    value={password}                
                    onChange={(e) => setPassword(e.target.value)}
                  />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" autoFocus onClick={handleClose} color="primary">
            Confirmar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
          <button onClick={handleClickOpen} className="settings-button-edit">Editar Informações</button>
          <Dialog  
          fullWidth={fullWidth}
          maxWidth={maxWidth}
         onClose={handleClose} 
         aria-labelledby="customized-dialog-title" 
         open={open}>
           <form className="userEdit-form" onSubmit={handleSubmit}> 
        <DialogContent dividers className="contentDialog">
        <div className="settings-container">
      <div className="settings-content">
      <h4>Atualizar dados</h4>
        <div className="settings-data-form">
          <div className="settings-info-form">
            <div className="settings-info-item-form">
              <strong>Nome</strong>
              <input
                    value={name}                
                    onChange={(e) => setName(e.target.value)}
                  />
            </div>
            <div className="settings-info-item-form">
              <strong>E-mail</strong>
              <input
                    value={email}                
                    onChange={(e) => setEmail(e.target.value)}
                  />
            </div>
            <div className="settings-info-item-form">
              <strong>CPF</strong>
              <input
                    value={cpf}                
                    onChange={(e) => setCpf(e.target.value)}
                  />
            </div>
            <div className="settings-info-item-form">
              <strong>Número de Telefone</strong>
              <input
                    value={phonenumber}                
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
            </div>
          </div>
          <div className="settings-button-area">
          </div>
        </div>
        <div className="settings-button-edit-area">
        </div>
      </div>
    </div>
        </DialogContent>
        <DialogActions classname="dialogac">
          <Button type="submit" autoFocus onClick={handleClose} color="primary">
            Salvar alterações
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      <button type="button" className="settings-button-delete" onClick={handleXopen}>
       Excluir minha conta
      </button>
      <Dialog open={xopen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <h5 className="modal-delete-title">Você tem certeza?</h5>
        <div className="account-delete">
          <DialogActions>
        <Button className="yes-button" onClick={(e) => handleDeleteUser()}>Sim</Button>
        <Button className="no-button" onClick={handleClose}>Não</Button>
        </DialogActions>
        </div>
        </DialogContent>
      </Dialog>
        </div>
      </div>
    </div>
  );
}
