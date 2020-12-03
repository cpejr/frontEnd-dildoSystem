import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from '../../../components/FormatDate/index'
import "./styles.css";
import CreateIcon from "@material-ui/icons/Create";

import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

function Pedido2(props) {
  const data = [];

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
          {/* {console.log('esse eh o text.id', text.action)} */}
          <Link to={
            {
              pathname: `admin/pendingorder/${text.action.id}`,
              myCustomProps: text.action
            }
          }>
            <CreateIcon size={20} color="#15425" />
        </Link>
        </Space>
      ),
    },
  ];

  props.orders.map((order, i) => (
    data.push({
      key: `${i+1}`,
      id: order.id,
      name: order.user.name,
      email: order.user.email,
      usertype: order.user.type,
      date: order.created_at,
      value: `R$${order.totalPrice}`,
      tags: [`${order.order_status}`],
      action: order
    })
  ))

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      
    </div>
  );
}

export default Pedido2;
