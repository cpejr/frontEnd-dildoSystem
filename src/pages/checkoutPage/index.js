import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import Header from '../../components/UserSidebar'
import { Link } from 'react-router-dom'

import WhatsButton from '../../components/WhatsAppButton'

import Logo from '../../images/CASULUS01LOGODESIGN.svg';
import Text from '../../images/CASULUS01LOGONAME.svg';

import './styles.css'

export default function CheckoutPage(props) {


    return (
        <div>
            {/* <Header /> */}
            {/* <AdminDashboard /> */}
            <header className="checkout-header">
                <img className="logo" src={Logo} alt="logo" width="75" height="75" />
                <img className="text" src={Text} alt="text" width="75" height="75" />
            </header>
            <div className="wrapper-check">
                <div className="checkout-wrapper">
                    <h3>Obrigado!</h3>
                    <p>
                        O número do seu pedido é: xxxxxxxxxx. <br />
                    Seu pedido está sendo processado e será enviado normalmente. <br />
                    Você receberá uma confirmação e atualizações do status por e-mail. <br />
                    </p>
                    <span>Elias Faria da Silva.</span>
                    <p className="detalhes-checkout">
                        Rua DosBobos, numero0 - apto Bagunça <br />
                        Bairro da loucura - Belzonte - Minas Jerais <br />
                        CEP 123456789
                    </p>
                    <h6>R$ 1549.50</h6>
                </div>

            </div>
            <div className="button-wrapper">
                <Link className="checkout-button" to="/">
                    Voltar às compras
                </Link>
            </div>
            <WhatsButton className="WhatsIcon" fontSize="large"/>
        </div>
    )
}