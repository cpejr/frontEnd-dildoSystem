import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Radio } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai'
import { Modal, Button, Input, Select, Spin } from 'antd';

import Header from '../../components/Header';
import { LoginContext } from '../../Contexts/LoginContext';
import api from '../../services/api';
import { callPaymentAPI, getShippingOptions } from './shippingAndPaymentAPIs';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit2 } from 'react-icons/fi';

import './styles.css';
import { CartContext } from '../../Contexts/CartContext';

const { Option } = Select;


const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function Addresses() {

  const [addressList, setAddressList] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();
  const [clearModal, setClearModal] = useState();

  const [isModal2Visible, setIsModal2Visible] = useState(false);

  const [spinning, setSpinning] = useState(false);

  const onChange = e => {
    setValue(e.target.value);
    setSelected(e.target.value)
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

  const showModal2 = () => {
    setIsModal2Visible(true)
  }
  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };


  const [newAddress, setNewAddress] = useState({});
  const [editAddress, setEditAddress] = useState({});
  const [auxAddress, setAuxAddress] = useState();


  const loginContext = useContext(LoginContext);
  const { cart } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
      api.get(`/useraddress/${loginContext.id}`, config).then(response => { setAddressList(response.data) });
    } catch (error) {

    }

  }, [loginContext.id, isModalVisible, isModal2Visible]);

  if (!loginContext.loggedIn) {
    history.push('login?return-to-addresses');
  }

  async function goToCheckout(address) {

    /* const cart = JSON.parse(localStorage.getItem('cart')); */
    // console.log(cart);
    // console.log(address);
    setSpinning(true);

    let shippingOptions = await getShippingOptions(cart, address.zipcode, loginContext.type);
    shippingOptions = shippingOptions.ShippingSevicesArray;

    const ongoingOrder = {
      address_id: address.id,
      products: cart.map(item => {
        return {
          product_id: item.id,
          product_quantity: item.quantity,
          subproduct_id: item.subproduct_id,
        }
      })
    };
    localStorage.setItem("ongoingOrder", JSON.stringify(ongoingOrder));

    await callPaymentAPI(cart, address, shippingOptions, loginContext);
    setSpinning(false);

    setTimeout(() => {
      notification.open({
        message: 'Erro!',
        description:
          'Houve um erro ao tentar criar o seu pedido.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      })
    }, 5000)
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
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  async function handleSubmitNewAddress(e) {
    e.preventDefault();

    if (newAddress.number === undefined) {
      newAddress.number = '1';
    }

    //removendo o - do CEP
    if (newAddress.zipcode[5] === '-') {
      let aux;
      let aux2;

      aux = newAddress.zipcode.slice(0, newAddress.zipcode.length - 4);
      aux2 = newAddress.zipcode.slice(6);

      newAddress.zipcode = aux + aux2

      // console.log('Novo CEP: ', newAddress.zipcode)
    }


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
        setIsModalVisible(!isModalVisible);
      } catch (error) {
        notification.open({
          message: 'Erro!',
          description:
            'Ocorreu um erro no cadastro desse endereço.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
        return;
      }

      // goToCheckout(newAddress);

    } else {
      notification.open({
        message: 'Erro!',
        description:
          'Preencha todos os campos para enviar um novo endereço.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  async function handleSubmitEditAddress(e){
    e.preventDefault();

    if (editAddress.number === undefined) {
      editAddress.number = '1';
    }

    //removendo o - do CEP
    if (editAddress.zipcode[5] === '-') {
      let aux;
      let aux2;

      aux = editAddress.zipcode.slice(0, editAddress.zipcode.length - 4);
      aux2 = editAddress.zipcode.slice(6);

      editAddress.zipcode = aux + aux2

      // console.log('Novo CEP: ', editAddress.zipcode)
    }

    if(!editAddress.complement) {
      delete editAddress.complement
    }


    if (editAddress.street
      && editAddress.number
      && editAddress.neighborhood
      && editAddress.state
      && editAddress.city
      && editAddress.zipcode) {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }

      delete editAddress.id 
      delete editAddress.created_at
      delete editAddress.updated_at
      delete editAddress.user_id
      delete editAddress.address_id

      try {
        // console.log('editAddress', editAddress)
        await api.put(`/address/${auxAddress}`, editAddress, config);
        setIsModal2Visible(!isModal2Visible);
      } catch (error) {
        notification.open({
          message: 'Erro!',
          description:
            'Ocorreu um erro no cadastro desse endereço.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
        return;
      }

      // goToCheckout(newAddress);

    } else {
      notification.open({
        message: 'Erro!',
        description:
          'Preencha todos os campos para enviar um novo endereço.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  function handleClickAddressEditButton(address) {
    setEditAddress(address)
    setAuxAddress(address.address_id)
    showModal2()
  }

  return (

    <div>
      <Header />
      <Spin size="large" spinning={spinning}>
        <div className="main-addresses-wrapper">
          <div className="addresses-content">
            <h2>Selecione um endereço, {loginContext.name}?</h2>
            <div className="addresses">
              <Radio.Group onChange={onChange} value={value}>
                {
                  addressList.map((address, index) =>
                    <div className="radio-group-wrapper">
                      <Address
                        onClick={() => { setSelected(index) }}
                        index={index}
                        address={address}
                        selected={index === selected}
                        key={`address-${index}`}
                      />
                      < FiEdit2 onClick={e => { e.stopPropagation(); handleClickAddressEditButton(address) }} />
                    </div>)
                }
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
                  <Input type="text" name="street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}  />

                  <label htmlFor="number">Número</label>
                  <Input className="short" type="number" name="number" value={newAddress.number} step='1' onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })} />

                  <label htmlFor="complement">Complemento</label>
                  <Input type="text" name="complement" value={newAddress.complement} onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })} />

                  <label htmlFor="neighborhood">Bairro</label>
                  <Input type="text" name="neighborhood" value={newAddress.neighborhood} onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })} />

                  <label htmlFor="state">Estado</label>
                  <select type="text" name="state" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} defaultValue="">
                    <option value="" disabled>Estado</option>
                    {states.map((state, i) => <option key={i} value={state}>{state}</option>)}
                  </select>

                  <label htmlFor="city">Cidade</label>
                  <Input type="text" name="city" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />

                  <label htmlFor="zipcode">CEP</label>
                  <Input type="text" name="zipcode" value={newAddress.zipcode} onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })} />
                  {/* <MaskedInput mask="11111-111" name="zipcode" size="20" onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}/> */}

                  {/* <button type="submit">Continuar com o novo endereço</button> */}
                </form>
              </div>
            </Modal>
            <Modal
              title="Editar endereço"
              visible={isModal2Visible}
              onOk={handleSubmitEditAddress}
              onCancel={handleCancel2}
              okText="Salvar"
              cancelText="Cancelar"
            >
              <div className="new-address">
                <form onSubmit={handleSubmitEditAddress}>
                  <label htmlFor="street">Rua ou Avenida</label>
                  <Input type="text" name="street" value={editAddress.street} onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })} defaultValue={`${editAddress.street}`} />

                  <label htmlFor="number">Número</label>
                  <Input className="short" type="number" name="number" value={editAddress.number} step='1' onChange={(e) => setEditAddress({ ...editAddress, number: e.target.value })} defaultValue={`${editAddress.number}`} />

                  <label htmlFor="complement">Complemento</label>
                  <Input type="text" name="complement" value={editAddress.complement} onChange={(e) => setEditAddress({ ...editAddress, complement: e.target.value })} defaultValue={`${editAddress.complement}`}/>

                  <label htmlFor="neighborhood">Bairro</label>
                  <Input type="text" name="neighborhood" value={editAddress.neighborhood} onChange={(e) => setEditAddress({ ...editAddress, neighborhood: e.target.value })} defaultValue={`${editAddress.neighborhood}`}/>

                  <label htmlFor="state">Estado</label>
                  <select type="text" name="state" value={editAddress.state} onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })} defaultValue={`${editAddress.state}`}>
                    <option value="" disabled>Estado</option>
                    {states.map((state, i) => <option key={i} value={state}>{state}</option>)}
                  </select>

                  <label htmlFor="city">Cidade</label>
                  <Input type="text" name="city" value={editAddress.city} onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })} defaultValue={`${editAddress.city}`}/>

                  <label htmlFor="zipcode">CEP</label>
                  <Input type="text" name="zipcode" value={editAddress.zipcode} onChange={(e) => setEditAddress({ ...editAddress, zipcode: e.target.value })} defaultValue={`${editAddress.zipcode}`}/>
                  {/* <MaskedInput mask="11111-111" name="zipcode" size="20" onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}/> */}

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
      </Spin>
    </div>
  );
}

function Address({ onClick, address, selected, index }) {

  

  return (
    <div>
      <Radio value={index} >
        <p>
          {
            address.complement ?
              `${address.street} ${address.number}, ${address.neighborhood}, ${address.complement} - ${address.city}, ${address.state} - CEP ${formatarCEP(address.zipcode)}`
              :
              `${address.street} ${address.number}, ${address.neighborhood} - ${address.city}, ${address.state} - CEP ${formatarCEP(address.zipcode)}`
          }
        </p>

      </Radio>
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