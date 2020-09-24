import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../services/api";

import Pedido from "./Pedido";
import "./styles.css";



function Main(props) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboard, setDashboard] = useState(true);
  const [farol, setFarol] = useState(true);

  useEffect(() => {
    api.get("orders", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setOrders(response.data);
        console.log('orders', response.data)
      });
  }, []);

  useEffect(() => {
    api.get("lowStock", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  useEffect(() => {
    api.get("users?user_status=pending", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <div className="main-container">
      <h4 className="titulo">Dashboard</h4>
      <div className="farol">
        <Link className="link-size" to ={
          { 
            pathname: `${props.match.path}/pendingorders`,
            farol: farol
        }}>
        <div className="pendentes" key={orders.id}>
          <h4>Pedidos pendentes:</h4>
          <h3>{orders.length}</h3>
        </div>
        </Link>
        <Link to='lowStock'>
        <div className="acabando">
          <h4>Produtos com pouco estoque:</h4>
          <h3>{products.length}</h3>
        </div>
        </Link>
        <Link className="link-size" to={`${props.match.path}/pendingusers`}>
        <div className="aguardando-aprovacao">
          <h4>Usuários aguardando aprovação</h4>
          <h3>{users.length}</h3>
        </div>
        </Link>
      </div>

      <div className="pedidos-pendentes">
        <h4 className="titulo">Últimos Pedidos</h4>     
        <div className="ultimos-pedidos">
        {orders.map((pedido, index) => (
            <Pedido key={`pedido-${index}`} pedido={pedido} dashboard={dashboard} />
          ))}
        </div>




      </div>
    </div>
  );
}

export default Main;
