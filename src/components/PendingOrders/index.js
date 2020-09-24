import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Pedido from "../../pages/Admin/Main/Pedido";

export default function PendingOrders(props) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };
  useEffect(() => {
    console.log(props.match.params.id);

    const url = `orders?byStatus=pending`;

    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrders(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <div className="main-container">
      <h4 className="titulo">Pedidos Pendentes</h4>
      <div className="pedidos-pendentes">
      <input
            type="text"
            className="input-search"
            name="searchTerm"
            placeholder="Pesquise o produto a editar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        <div className="ultimos-pedidos">

          {orders.map((pedido, index) => (
            <Pedido key={`pedido-${index}`} pedido={pedido} search={search}/>
          ))}
        </div>
      </div>
    </div>
  );
}
