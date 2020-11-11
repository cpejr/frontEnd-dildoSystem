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
    //console.log(props.match.params.id);
    const url = `orders?byStatus=pending`;

    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrders(response.data);
        console.log(response.data);
      });
    }
  }, []);

  function handleSubmit(e){
    e.preventDefault()
    const url = `order/${"abcd"}?order_id=${search}`
    api.get(url, config).then((response) => {
      console.log("resposta",response.data)
      setOrders([response.data])
    }
    )
  }

  return (
    <div className="main-container">
      <h4 className="titulo">Pedidos Pendentes</h4>
      <div className="pedidos-pendentes">
        <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="input-search"
          name="searchTerm"
          placeholder="Pesquise o pedido a editar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Enviar</button>
        </form>
        <div className="ultimos-pedidos">
          {orders.map((pedido, index) => (
            <Pedido key={`pedido-${index}`} pedido={pedido} search={search} />
          ))}
        </div>
      </div>
    </div>
  );
}
