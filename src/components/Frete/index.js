import React, { useState } from 'react';

import { notification, Radio, Input } from 'antd';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import api from '../../services/api';

import './styles.css';

const Testefrete = function ({ products, totalprice }) {
  const [cep, setCEP] = useState('');
  const [shipping, setShipping] = useState([]);
  const [value, setValue] = useState('');
  const [radio, setRadio] = useState('');

  const produtos = [];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!products) {
      return notification.error({
        message: 'Adicione produtos no carrinho para calcular o frete',
      });
    }

    products.map((p) => produtos.push({
      Weight: p.weight / 1000,
      Height: p.height,
      Width: p.width,
      Length: p.length,
      Quantity: p.quantity,
    }));

    const freteData = {
      SellerCEP: '75389334',
      RecipientCEP: cep,
      ShipmentInvoiceValue: totalprice,
      ShippingServiceCode: null,
      ShippingItemArray: produtos,
      RecipientCountry: 'BR',
    };

    try {
      const response = await api.post('frenet', freteData);
      setShipping(response.data.ShippingSevicesArray);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFreteError(envio) {
    if (envio.ServiceDescription === 'SEDEX' && envio.Error) {
      notification.open({
        message: 'Erro',
        description: envio.Msg,
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  const radioStyle = {
    display: 'block',
    height: 'auto',
    lineHeight: '30px',
  };

  function onChange(e) {
    setRadio(e.target.value);
  }

  return (
    <div className="frete-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="setCep d-flex">
          <label>Entrega:</label>
          <div className="inputCep d-flex">
            <input
              type="text"
              value={cep}
              onChange={(e) => setCEP(e.target.value)}
              placeholder="CEP"
            />
            <button type="submit" value="Enviar">
              Enviar
            </button>
          </div>
        </div>
      </form>
      <span>{'Preço do frete: '}</span>
      {shipping ? (
        <div className="frete-options-area">
          <Radio.Group onChange={(e) => onChange(e)} value={radio}>
            {shipping.map((envio, i) => (envio.Error ? (
              <option key={i} className="option-error">
                {' '}
                {handleFreteError(envio)}
                {' '}
                Nenhum
              </option>
            ) : (
              <Radio style={radioStyle} value={i} key={i}>
                {envio.ServiceDescription}
                {' '}
                - R$
                {envio.ShippingPrice}
                {' '}
                -
                {' '}
                {envio.DeliveryTime}
                {' '}
                dias úteis.
              </Radio>
            )))}
          </Radio.Group>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Testefrete;
