import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Pedido from "../../pages/Admin/Main/Pedido";

import './styles.css'

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
    try{
      api.get(url, config).then((response) => {
        console.log("resposta",response.data)
        setOrders([response.data])
      }
      )
    }
    catch (err){
      console.error(err);
      alert('Erro ao buscar o filtro!');
    }
  }

  return (
    <div className="main-container">
      <h4>Pedidos Pendentes</h4>
      
      <div className="pedidos-pendentes">
        <form className="pending-orders-form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="input-search-pending-orders"
          name="searchTerm"
          placeholder="Insira o ID do pedido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="pending-orders-button">Buscar</button>
        </form>
        <div className="ultimos-pedidos">
          {/* {orders.map((pedido, index) => ( */}
            <Pedido  orders={orders} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
