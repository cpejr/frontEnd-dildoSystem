import React, { useState } from 'react';

import { notification } from 'antd';
import { Radio, Input } from 'antd';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import api from '../../services/api';

import './styles.css'

function Testefrete({ products, totalprice }) {
    const [cep, setCEP] = useState('');
    const [shipping, setShipping] = useState([]);
    const [value, setValue] = useState('');
    const [radio, setRadio] = useState('')

    let produtos = []


    async function handleSubmit(e) {
        e.preventDefault();

        // console.log('tem algum produto aqui?',products);

        products.map(p => (
            produtos.push(
                {
                    Weight: (p.weight / 1000),
                    Height: p.height,
                    Width: p.width,
                    Length: p.length,
                    Quantity: p.quantity
                }
            )
        ))


        const freteData = {

            SellerCEP: "75389334",
            RecipientCEP: cep,
            ShipmentInvoiceValue: totalprice,
            ShippingServiceCode: null,
            ShippingItemArray: produtos,
            RecipientCountry: "BR"
        }

        try {
            const response = await api.post('frenet', freteData);
            /* console.log(response); */
            setShipping(response.data.ShippingSevicesArray);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickDrop = (e) => {
        // console.log(e.target.value)
        setValue(e.target.value)
    }

    function handleFreteError(envio) {

        if (((envio.ServiceDescription === "SEDEX") && envio.Error)) {
            // console.log(envio.ServiceDescription)
            notification.open({
                message: 'Erro',
                description:
                    envio.Msg,
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
                style: {
                    width: 600,
                },
            })
        }
    }

    const radioStyle = {
        display: 'block',
        height: 'auto',
        lineHeight: '30px',
    };

    function onChange(e) {
        // console.log('radio checked', e.target.value);
        setRadio(e.target.value)
    }



    return (

        <div className="frete-wrapper">
            <form onSubmit={handleSubmit}>
                <div className='setCep d-flex'>
                    <label>Entrega:</label>
                    <div className='inputCep d-flex'>
                        <input
                            type="text"
                            value={cep}
                            onChange={(e) => setCEP(e.target.value)}
                            placeholder="CEP"
                        />
                        <button type="submit" value="Enviar" >Enviar</button>
                    </div>

                </div>
            </form>
            <span>{`Preço do frete: `}</span>
            {
                shipping ?
                    <div className="frete-options-area">
                        <Radio.Group onChange={(e) => onChange(e)} value={radio}>
                            {
                                shipping.map((envio, i) => (
                                    envio.Error ?
                                        <option key={i} className="option-error"> {handleFreteError(envio)} Nenhum</option>
                                        :
                                        <Radio style={radioStyle} value={i} key={i}>
                                            {envio.ServiceDescription} - R$ {envio.ShippingPrice} - {envio.DeliveryTime} dias úteis.
                                        </Radio>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    :
                    ''
            }

            {/* <div className="dropdown-cart-ship">
                <select value={value} onChange={handleClickDrop}>
                    {
                        shipping.map((envio, i) => (
                            envio.Error ?
                                <option key={i} className="option-error"> {handleFreteError(envio)} Nenhum</option>
                                :
                                <option key={i + 32} value={`${envio.ServiceDescription} - R$ ${envio.ShippingPrice}`}>
                                    {envio.ServiceDescription} - R$ {envio.ShippingPrice} - {envio.DeliveryTime} dias úteis.
                                </option>
                        ))
                    }
                </select>
            </div> */}
        </div>
    )
}

export default Testefrete; 