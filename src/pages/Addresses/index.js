import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Radio } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai'
import { Modal, Button, Input, Select } from 'antd';

import Header from '../../components/Header';
import { LoginContext } from '../../Contexts/LoginContext';
import api from '../../services/api';
import { callPaymentAPI, getShippingOptions } from './shippingAndPaymentAPIs';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import './styles.css';

const { Option } = Select;


const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function Addresses() {

  const [addressList, setAddressList] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();

  const onChange = e => {
    setValue(e.target.value);
    setSelected(value)
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [newAddress, setNewAddress] = useState({});

  const loginContext = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
      api.get(`/useraddress/${loginContext.id}`, config).then(response => { console.log(response.data); setAddressList(response.data) });
    } catch (error) {

    }

  }, [loginContext.id]);

  if (!loginContext.loggedIn) {
    history.push('login?return-to-addresses');
  }

  async function goToCheckout(address) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    console.log(address);
    let shippingOptions = await getShippingOptions(cart, address.zipcode, loginContext.type);
    shippingOptions = shippingOptions.ShippingSevicesArray;
    console.log(shippingOptions);

    const ongoingOrder = {
      address_id: address.id,
      products: cart.map(item => {
        return {
          product_id: item.product.id,
          product_quantity: item.quantity
        }
      })
    };
    localStorage.setItem("ongoingOrder", JSON.stringify(ongoingOrder));

    callPaymentAPI(cart, address, shippingOptions, loginContext);
  }

  async function handleSubmitExistingAddress() {
    if (selected >= 0) {
      goToCheckout(addressList[selected])
    } else {
      notification.open({
        message: 'Erro!',
        description:
          'Selecione um dos seus endereços cadastrados.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  async function handleSubmitNewAddress(e) {
    e.preventDefault();

    console.log(newAddress)

    if (newAddress.street
      && newAddress.number
      && newAddress.neighborhood
      && newAddress.state
      && newAddress.city
      && newAddress.zipcode) {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }

      try {
        await api.post(`/address`, newAddress, config);
      } catch (error) {
        notification.open({
          message: 'Erro!',
          description:
            'Ocorreu um erro no cadastro desse endereço.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
          style: {
            width: 600,
          },
        });
        return;
      }

      goToCheckout(newAddress);

    } else {
      notification.open({
        message: 'Erro!',
        description:
          'Preencha todos os campos para enviar um novo endereço.',
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

    <div>
      <Header />
      <div className="main-addresses-wrapper">
        <div className="addresses-content">
          <h2>Para qual endereço você gostaria de enviar a sua compra, {loginContext.name}?</h2>
          <div className="addresses">
            <Radio.Group onChange={onChange} value={value}>
              {addressList.map((address, index) => <Address onClick={() => { setSelected(index) }} index={index} address={address} selected={index === selected} key={`address-${index}`} />)}
            </Radio.Group>
          </div>
          <div className='select-new-address' onClick={showModal}>
            <AiOutlinePlus size={20} />
            <p>Novo Endereço</p>
          </div>
          <button onClick={handleSubmitExistingAddress}>Continuar com o endereço selecionado</button>
          <Modal
            title="Cadastrar novo endereço"
            visible={isModalVisible}
            onOk={handleSubmitNewAddress}
            onCancel={handleCancel}
            okText="Salvar"
            cancelText="Cancelar"
          >
            <div className="new-address">
              <form onSubmit={handleSubmitNewAddress}>
                <label htmlFor="street">Rua ou Avenida</label>
                <Input type="text" name="street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />

                <label htmlFor="number">Número</label>
                <Input className="short" type="number" name="number" value={newAddress.number} step='1' onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })} />

                <label htmlFor="complement">Complemento</label>
                <Input type="text" name="complement" value={newAddress.complement} onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })} />

                <label htmlFor="neighborhood">Bairro</label>
                <Input type="text" name="neighborhood" value={newAddress.neighborhood} onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })} />

                <label htmlFor="state">Estado</label>
                <select type="text" name="state" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} defaultValue="">
                  <option value="" disabled>Estado</option>
                  {states.map(state => <option value={state}>{state}</option>)}
                </select>

                <label htmlFor="city">Cidade</label>
                <Input type="text" name="city" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />

                <label htmlFor="zipcode">CEP</label>
                <Input type="text" name="zipcode" value={newAddress.zipcode} onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })} />

                {/* <button type="submit">Continuar com o novo endereço</button> */}
              </form>
            </div>
          </Modal>
          {/* <div className="new-address">
            <h3>Se preferir, cadastre um novo endereço</h3>
            <form onSubmit={handleSubmitNewAddress}>
              <label htmlFor="street">Rua ou Avenida</label>
              <input type="text" name="street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />

              <label htmlFor="number">Número</label>
              <input className="short" type="number" name="number" value={newAddress.number} step='1' onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })} />

              <label htmlFor="complement">Complemento</label>
              <input type="text" name="complement" value={newAddress.complement} onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })} />

              <label htmlFor="neighborhood">Bairro</label>
              <input type="text" name="neighborhood" value={newAddress.neighborhood} onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })} />

              <label htmlFor="state">Estado</label>
              <select type="text" name="state" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} defaultValue="">
                <option value="" disabled>Estado</option>
                {states.map(state => <option value={state}>{state}</option>)}
              </select>

              <label htmlFor="city">Cidade</label>
              <input type="text" name="city" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />

              <label htmlFor="zipcode">CEP</label>
              <input type="text" name="zipcode" value={newAddress.zipcode} onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })} />

              <button type="submit">Continuar com o novo endereço</button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function Address({ onClick, address, selected, index }) {
  console.log("Address: ", address)
  return (
    <div>
      <Radio value={index} ><p>{`${address.street} ${address.number}, ${address.neighborhood}, ${address.complement} - ${address.city}, ${address.state} - CEP ${formatarCEP(address.zipcode)}`}</p></Radio>
      {/* <p>{`${address.street}, ${address.number}, ${address.complement}`}</p>
      <p>{address.neighborhood}</p>
      <p>{`${address.city} - ${address.state}`}</p>
      <p>{address.zipcode}</p> */}
    </div>

    // <div className={`address-box ${selected && 'selected'}`} onClick={onClick}>
    //   <p>{`${address.street}, ${address.number}, ${address.complement}`}</p>
    //   <p>{address.neighborhood}</p>
    //   <p>{`${address.city} - ${address.state}`}</p>
    //   <p>{address.zipcode}</p>
    // </div>
  );
}

function formatarCEP(str) {
  var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *

  if (re.test(str)) {
    return str.replace(re, "$1.$2-$3");
  } else {
    alert("CEP inválido!");
  }

  return "";
}

export default Addresses;