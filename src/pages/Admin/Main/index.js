import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../services/api";

import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

import Pedido from "./Pedido";
import "./styles.css";



function Main(props) {
  const [orders, setOrders] = useState([]);
  const [pendingorders, setPendingOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboard, setDashboard] = useState(true);
  const [farol, setFarol] = useState(true);

  const [page, setPage] = useState(1);

  const data = [];

  useEffect(() => {
    api.get("orders?byStatus=pending", {
      headers: {
        authorization: "Bearer " + localStorage.accessToken,
      },
    })
      .then((response) => {
        setPendingOrders(response.data);
        console.log('Pending Orders', response.data)
      });
  }, []);

  useEffect(() => {
    api.get("orders", {
      headers: {
        authorization: "Bearer " + localStorage.accessToken,
      },
    })
      .then((response) => {
        setOrders(response.data);
        console.log('Orders', response.data);
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

  function loadFollowingPage() {
    const url = `orders?byStatus=pending&page=${page + 1}`
    const accessToken = localStorage.accessToken;
    const config = {
      headers: {
        authorization: "Bearer " + accessToken,
      }
    }

    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrders([...orders, ...response.data]);
        setPage(page + 1);
        console.log(response.data);
      });
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo de usário',
      dataIndex: 'usertype',
      key: 'usertype',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Editar</a>
        </Space>
      ),
    },
  ];

  orders.map((order, i) => (
    data.push({
      key: `${i}+1`,
      id: order.id,
      name: order.user.name,
      email: order.user.email,
      usertype: order.user.type,
      date: order.created_at,
      value: order.totalPrice,
      tags: [`${order.order_status}`]
    })
  ))


  return (
    <div className="main-container">
      <h4 className="titulo">Dashboard</h4>
      <div className="farol">
        <Link className="link-size" to={`${props.match.path}/pendingorders`}>
          <div className="pendentes" key={orders.id}>
            <h4>Pedidos pendentes:</h4>
            <h3>{pendingorders.length}</h3>
          </div>
        </Link>
        <Link to={
          `${props.match.path}/lowStock`
        }>
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
          <Pedido dashboard={dashboard} orders={orders} onChange={loadFollowingPage} />
        </div>
      </div>
    </div>
  );
}

export default Main;
