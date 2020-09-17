import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../../services/api';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import XMLParser from 'react-xml-parser'

function Testefrete() {
const [cep, setCEP] = useState();
const [mensage, setmensage] = useState("");
async function handleSubmit(e){
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        
    };
    const response =  fetch(`https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=70002900&sCepDestino=${cep}&nVlPeso=3&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`, requestOptions)
    .then(res => res.text())
    .then(data => {
        var xml = new XMLParser().parseFromString(data); 
        setmensage(xml.children[0].children[1].value);

    })
    .catch(err => console.log(err));
      
}
    return (
       
<div>
<form onSubmit={handleSubmit}>
        <label>
          CEP:
          <input type="text" value={cep} onChange={(e) => setCEP(e.target.value)} />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <div>{`Preço do frete:${mensage}`}</div>
</div>
    )
}

export default Testefrete; 