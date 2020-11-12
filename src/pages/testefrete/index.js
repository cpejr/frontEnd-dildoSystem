import React, { useState } from 'react';

import './styles.css'

function Testefrete({products}) {
    const [cep, setCEP] = useState();
    const [shipping, setShipping] = useState([]);
    const [value, setValue] = useState('');

    // const [products, setProducts] = useState(products);

    let produtos = []

    // useEffect(() => {
    //     let cart = [];
    //     if (localStorage.getItem('cart')) {
    //         cart = JSON.parse(localStorage.getItem('cart'));
    //     }
    //     setProducts(cart);
    //     console.log(cart)

    // }, [])

    // useEffect(() => {
    //     products.map(p => (
    //         produtos.push(
    //             {
    //                 Weight: p.product.weight,
    //                 Height: p.product.height,
    //                 Width: p.product.width,
    //                 Length: p.product.length,
    //                 Quantity: p.quantity
    //             }
    //         )
    //     ))
    // }, [cep])

    // useEffect(() => (


    //     produtos.map(p => (

    //         products.push({
    //             Height: p.height,
    //             Length: p.length,
    //             Quantity: 1,
    //             Weight: p.weight,
    //             Width: p.width,
    //         }),
    //         console.log(p)
    //     ))
    // ), [])


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

        console.log('dimensoes dos produtos: ', produtos)

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
                console.log(data)
                console.log(data.ShippingSevicesArray[0].ShippingPrice)
                setShipping(data.ShippingSevicesArray)
            })
            .catch(err => console.error(err));


        // const requestOptions = {
        //     method: 'POST',

        // };
        // const response = fetch(`https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=70002900&sCepDestino=${cep}&nVlPeso=3&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`, requestOptions)
        //     .then(res => res.text())
        //     .then(data => {
        //         var xml = new XMLParser().parseFromString(data);
        //         setmensage(xml.children[0].children[1].value);

        //     })
        //     .catch(err => console.error(err));

    }

    const handleClickDrop = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }



    return (

        <div className="frete-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Entrega:                </label>
                <input type="text" value={cep} onChange={(e) => setCEP(e.target.value)} placeholder="CEP" />
                <button type="submit" value="Enviar" >Enviar</button>
            </form>
            <span>{`Preço do frete: `}</span>
            <div className="dropdown-cart-ship">
                <select value={value} onChange={handleClickDrop}>
                    {
                        shipping.map(envio => (
                            envio.Error ?
                                ''
                                :
                                <option value={`${envio.ServiceDescription} - R$ ${envio.ShippingPrice}`}>
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