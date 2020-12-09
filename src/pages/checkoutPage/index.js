import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'

import WhatsButton from '../../components/WhatsAppButton'

import Logo from '../../images/CASULUS01LOGODESIGN.svg';
import Text from '../../images/CASULUS01LOGONAME.svg';
import Loading from '../../images/Loading.gif';

import api from '../../services/api';
import cart from '../../services/cart';
import { LoginContext } from '../../Contexts/LoginContext';

import './styles.css'

export default function CheckoutPage(props) {

    const { order_id } = useParams();
    const history = useHistory();

    const loginContext = useContext(LoginContext);

    const [order, setOrder] = useState();

    useEffect(() => {

        async function getMockOrder() {
            try {
                const options = {
                    headers: {
                        authorization: `Bearer ${loginContext.accessToken}`
                    }
                }
                const response = await api.get(`mockOrder/${order_id}`, options);
                return response.data;

            } catch (error) {
                console.log(error);
                return error;
            }
        }

        async function createOrder(order) {
            try {
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${loginContext.accessToken}`
                    }
                }
                const response = await api.post(`newOrder`, order, options);
                return response.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        }

        async function getExistingOrder() {
            try {
                const options = {
                    headers: {
                        authorization: `Bearer ${loginContext.accessToken}`
                    }
                }
                const response = await api.get(`order/${loginContext.id}?order_id=${order_id}`, options);
                return response.data;

            } catch (error) {
                console.log(error);
                return error;
            }
        }

        async function createAndRender() {
            const mock = await getMockOrder();
            if (!mock || mock instanceof Error) {
                const order = await getExistingOrder();
                if (!order || order instanceof Error) {
                    history.push('/notFound')
                }
                setOrder(order);
                return;
            }

            let newOrder = JSON.parse(localStorage.getItem("ongoingOrder"));

            newOrder = { ...newOrder, ...mock };
            newOrder.id = order_id;
            delete newOrder.order_id;

            const order = await createOrder(newOrder);
            setOrder(order);
            localStorage.removeItem("ongoingOrder");
            cart.clear();
        }


        if (loginContext.accessToken) createAndRender();

    }, [loginContext.accessToken])

    function getPrice() {
        return (Math.round((order.total_price || 0) * 100) / 100).toFixed(2);
    }

    return (
        <div>
            <header className="checkout-header">
                <Link to="/">
                    <img className="logo" src={Logo} alt="logo" />
                    <img className="text" src={Text} alt="text" />
                </Link>
            </header>
            {!order ? <div className="loading-container"><img src={Loading} alt={'Loading...'} /> </div> :
                (<>
                    <div className="wrapper-check">
                        <div className="checkout-wrapper">
                            <h3>Obrigado!</h3>
                            <p>
                                O número do seu pedido é: {order.id}. <br />
                    Seu pedido está sendo processado e será enviado normalmente. <br />
                    Você receberá uma confirmação e atualizações do status por e-mail. <br />
                            </p>
                            <span>{order.user.name}</span>
                            <p className="detalhes-checkout">
                                {order.street}, numero {order.number} {order.complement && ` - ${order.complement}`}  <br />
                        Bairro {order.neighborhood} - {order.city} - {order.state} <br />
                        CEP {order.zipcode}
                            </p>
                            <h6>R$ {getPrice()}</h6>
                        </div>

                    </div>
                    <div className="button-wrapper">
                        <Link className="checkout-button" to="/">
                            Voltar às compras
                </Link>
                    </div>
                    <WhatsButton className="WhatsIcon" fontSize="large" />
                </>
                )}
        </div>
    )
}