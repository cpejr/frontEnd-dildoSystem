import React from "react";
import "./styles.css";
import { IoMdKey } from "react-icons/io";
import api from "../../services/api";
import {useEffect} from "react";
import useStateWithPromise from "../../Contexts/useStateWithPromise";

export default function ProfileSettings(props, { id, className, fileName, onSubmit }) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  //const [password, setPassword] = useState("");
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

  const LoginContext = React.createContext({});
  const [accessToken, setAccessToken] = useStateWithPromise("");


 /* async function handleSubmit(e) {
    e.preventDefault();
    
    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '')
        data.append(key, value);
    }

    addToData('name', name);
    addToData('email', email);
    //addToData('password', password);
    //addToData('type', type);
    addToData('cpf', cpf);
    //addToData('birthdate', birthdate);
    addToData('zipcode', zipcode);
    addToData('phonenumber', phonenumber);
    addToData('state', state);
    addToData('city', city);
    addToData('neighrborhood', neighborhood);
    addToData('street', street);
    addToData('number', number);
    addToData('complement', complement);

    try {
      const response = await api.get("user/:id", data, {
          headers: {
            "Content-Type" : "application/json",
            authorization: "Bearer " + localStorage.accessToken,
          }
        })
        alert(`Registro concluído!`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.log(err.response);
      alert("Register error");
    }
  } 
   <form onSubmit={handleSubmit}> 
   </form>
  */

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
            setComplement(resp.data.user.complement)
          ]);
        } 
      }
      grabData();
    }
  }, []);
  

  return (
    <div className="settings-container">
      <h4>Meus Dados</h4>
      <div className="settings-content">
        <div className="settings-data">
          <div className="settings-img"></div>
          <div className="settings-info">
            <div className="settings-info-item">
              <strong>Nome</strong>
              <p>{name}</p>
            </div>
            <div className="settings-info-item">
              <strong>E-mail</strong>
              <p>{email}</p>
            </div>
            <div className="settings-info-item">
              <strong>CPF</strong>
              <p>{cpf}</p>
            </div>
            <div className="settings-info-item">
              <strong>Número de Telefone</strong>
              <p>{phonenumber}</p>
            </div>
          </div>
          <div className="settings-button-area">
            <button className="settings-button">
              <IoMdKey className="settings-key" size={20} />
              Alterar Senha
            </button>
          </div>
        </div>
        <h4>Endereço</h4>
        <div className="settings-adress">  
          <div className="settings-adress-item">
            <strong>Estado</strong>
            <p>{state}</p>
          </div>
          <div className="settings-adress-item">
            <strong>Cidade</strong>
            <p>{city}</p>
          </div>
          <div className="settings-adress-item">
            <strong>CEP</strong>
            <p>{zipcode}</p>
          </div>
          <div className="settings-adress-item">
            <strong>Bairro</strong>
            <p>{neighborhood}</p>
          </div>
          <div className="settings-adress-item">
            <strong>Rua</strong>
            <p>{street}</p>
          </div>
          <div className="settings-adress-item">
            <strong>Número</strong>
            <p>{number}</p>
          </div>
          <div className="settings-adress-item">
            <strong>Complemento</strong>
            <p>{complement}</p>
          </div>
        </div>
        <div className="settings-button-edit-area">
          <button className="settings-button-edit">Editar Informações</button>
        </div>
      </div>
    </div>
  );
}
