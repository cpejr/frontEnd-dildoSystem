import React from "react";
import "./styles.css";
import { IoMdKey } from "react-icons/io";

export default function ProfileSettings() {
  return (
    <div className="settings-container">
      <h4>Configurações</h4>
      <div className="settings-content">
        <div className="settings-data">
          <div className="settings-img"></div>
          <div className="settings-info">
            <div className="settings-info-item">
              <strong>Nome</strong>
              <p>Alceu Carvalho Pinto</p>
            </div>
            <div className="settings-info-item">
              <strong>E-mail</strong>
              <p>wojciech@yahoo.com</p>
            </div>
            <div className="settings-info-item">
              <strong>CPF</strong>
              <p>193.032.322-86</p>
            </div>
            <div className="settings-info-item">
              <strong>Número de Telefone</strong>
              <p>(31)99753-9427</p>
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
            <p>MG</p>
          </div>
          <div className="settings-adress-item">
            <strong>Cidade</strong>
            <p>Belo Horizonte</p>
          </div>
          <div className="settings-adress-item">
            <strong>CEP</strong>
            <p>31888-999</p>
          </div>
          <div className="settings-adress-item">
            <strong>Bairro</strong>
            <p>Esperança</p>
          </div>
          <div className="settings-adress-item">
            <strong>Rua</strong>
            <p>Rua Flor Branca</p>
          </div>
          <div className="settings-adress-item">
            <strong>Número</strong>
            <p>175</p>
          </div>
          <div className="settings-adress-item">
            <strong>Complemento</strong>
            <p>Apto 305</p>
          </div>
          <div className="settings-adress-item">
            <strong>Referência</strong>
            <p>Próximo ao Bar do Tadeu</p>
          </div>
        </div>
        <div className="settings-button-edit-area">
          <button className="settings-button-edit">Editar Informações</button>
        </div>
      </div>
    </div>
  );
}
