import React, { useState, useEffect } from "react";
import { notification } from 'antd';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Input } from 'antd'

import api from "../../services/api";
import Pedido from "../../pages/Admin/Main/Pedido";

import './styles.css'

export default function PendingOrders(props) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
   
    const url = `orders?byStatus=pending`;

    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrders(response.data);
        
      });
    }
  }, []);

  function loadFollowingPage() {
    const url = `orders?byStatus=pending&page=${page + 1}`

    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrders([...orders, ...response.data]);
        if (response.data && response.data.length > 0) setPage(page + 1);
        
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const url = `order/${"abcd"}?order_id=${search}`
    try {
      api.get(url, config).then((response) => {
        setOrders([response.data]);
        setPage(1);
      }
      )
    }
    catch (err) {
      console.error(err);
      notification.open({
        message: 'Erro!',
        description:
          'Erro ao buscar o filtro.',
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
    <div className="main-container">
      <h4>Pedidos Pendentes</h4>

      <div className="pedidos-pendentes">
        <form className="pending-orders-form" onSubmit={handleSubmit}>
          <Input
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
          <Pedido orders={orders} onChange={(pagination) => loadFollowingPage()} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
