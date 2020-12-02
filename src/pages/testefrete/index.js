import React, { useState } from 'react';

import './styles.css'

function Testefrete({ products }) {
    const [cep, setCEP] = useState('');
    const [shipping, setShipping] = useState([]);
    const [value, setValue] = useState('');

    let produtos = []


    async function handleSubmit(e) {
        e.preventDefault();

        products.map(p => (
            produtos.push(
                {
                    Weight: p.product.weight,
                    Height: p.product.height,
                    Width: p.product.width,
                    Length: p.product.length,
                    Quantity: p.quantity
                }
            )
        ))

        // console.log('dimensoes dos produtos: ', produtos)

        const freteData = {

            SellerCEP: "31150220",
            RecipientCEP: cep,
            ShipmentInvoiceValue: 320.685,
            ShippingServiceCode: null,
            ShippingItemArray: produtos,
            RecipientCountry: "BR"
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': '141A8046RB13FR4AE0R9085RD085090B7777'
            },
            body: JSON.stringify(freteData)
        }

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = `http://api.frenet.com.br/shipping/quote`

        const response = fetch(proxyUrl + targetUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // console.log(data.ShippingSevicesArray[0].ShippingPrice)
                setShipping(data.ShippingSevicesArray)
            })
            .catch(err => console.error(err));


    }

    const handleClickDrop = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }



    return (

        <div className="frete-wrapper">
            <form onSubmit={handleSubmit}>
                <div className='setCep d-flex'>
                    <label>Entrega:</label>
                    <div className='inputCep d-flex'>
                        <input type="text" value={cep} onChange={(e) => setCEP(e.target.value)} placeholder="CEP" />
                        <button type="submit" value="Enviar" >Enviar</button>
                    </div>

                </div>
            </form>
            <span>{`Preço do frete: `}</span>
            <div className="dropdown-cart-ship">
                <select value={value} onChange={handleClickDrop}>
                    {
                        shipping.map(envio => (
                            envio.Error ?
                                ''
                                :
                                <option key={envio.ShippingPrice} value={`${envio.ServiceDescription} - R$ ${envio.ShippingPrice}`}>
                                    {envio.ServiceDescription} - R$ {envio.ShippingPrice}
                                </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default Testefrete; 