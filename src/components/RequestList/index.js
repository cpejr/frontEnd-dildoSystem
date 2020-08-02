import React from "react";
import "./styles.css";
import RequestArray from "./request.js";

const MeusPedidos = [
  {
    requestNumber: 12345,
    name: "Sabonete Haus Preto",
    quantity: 2,
    productPrice: 15.0,
    delivery: 2.0,
    deadline: "07/12",
  },
  {
    requestNumber: 12345,
    name: "Sabonete Haus Preto",
    quantity: 2,
    productPrice: 10.0,
    delivery: 2.0,
    deadline: "07/12",
  },
  {
    requestNumber: 12345,
    name: "Sabonete Haus Preto",
    quantity: 2,
    productPrice: 10.0,
    delivery: 2.0,
    deadline: "07/12",
  }, 
];

export default function RequestsList() {
  return (
    <div className="request-all">
      <h4>Meus Pedidos</h4>
      <div className="requestlist-container">
        <div className="request-data">
        </div>
        {MeusPedidos.map((produto, index) => (
          <RequestArray key={`produto-${index}`} produto={produto} />
        ))}
      </div>
    </div>
  );
}