import React from 'react';
import { GoVerified, GoMegaphone } from 'react-icons/go';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaShippingFast } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer'

function About() {
    return (
        <>
            <Header />
            <div className="about-content">
                <h2>Quem Somos</h2>
                <div className="about-institutional">
                    <div className="about-container">
                        <h3>Quem Somos</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        lorem eros, finibus quis nulla in, dapibus tincidunt tellus.
                        Nam efficitur enim leo. Fusce eu velit vitae nunc tristique fermentum.
                        Aenean dapibus massa velit. Etiam et tempus tortor, et posuere mauris.
                        Aliquam mattis placerat nisi. Quisque ut leo turpis.</p>
                    </div>
                    <div className="about-container">
                        <h3>Missão</h3>
                        <p className="right">Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur. Sed posuere luctus nunc
                        et dignissim. Duis id lectus scelerisque, laoreet nibh vel, euismod
                        neque. Aenean a tellus quam. Aliquam dictum lorem in leo euismod sodales.</p>
                    </div>
                </div>
                <div className="about-institutional">
                    <div className="about-container">
                        <h3>Visão</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        lorem eros, finibus quis nulla in, dapibus tincidunt tellus.
                        Nam efficitur enim leo. Fusce eu velit vitae nunc tristique fermentum.
                        Aenean dapibus massa velit. Etiam et tempus tortor, et posuere mauris.
                    Aliquam mattis placerat nisi. Quisque ut leo turpis.</p>
                    </div>
                    <div className="about-container">
                        <h3>Valores</h3>
                        <p className="right">Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur. Sed posuere luctus nunc
                        et dignissim. Duis id lectus scelerisque, laoreet nibh vel, euismod
                        neque. Aenean a tellus quam. Aliquam dictum lorem in leo euismod sodales.</p>
                    </div>
                </div>
                <div className="about-benefits">
                    <div className="about-benefits-item">
                        <div className="about-benefits-title">
                            <GoVerified size={50} />
                        </div>
                        <p>Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur.</p>
                    </div>
                    <div className="about-benefits-item">
                        <div className="about-benefits-title">
                            <RiMoneyDollarCircleLine size={50} />
                        </div>
                        <p>Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur.</p>
                    </div>
                    <div className="about-benefits-item">
                        <div className="about-benefits-title">
                            <GoMegaphone size={50} />
                        </div>
                        <p>Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur.</p>
                    </div>
                    <div className="about-benefits-item">
                        <div className="about-benefits-title">
                            <FaShippingFast size={50} />
                        </div>
                        <p>Cras elementum felis ac facilisis lacinia. Morbi tristique at eros et
                        tempus. Proin non ultricies tortor. Nullam tempus bibendum fermentum.
                        Integer viverra quam quis commodo efficitur.</p>
                    </div>

                </div>
                <div className="about-institutional">
                    <div className="about-container">
                        <h3>Informações: </h3>
                        <p>Razão Social: Casulus</p>
                        <p>CNPJ: 31.834.765/0001-50</p>
                        <p>Rua Teste de Rua - Pampulha</p>
                        <p>Minas Gerais - MG - CEP 00215-021</p>
                        <p>Horário de atendimento:</p>
                        <p>De Segunda a Sexta das 08:00 as 17:30hrs</p>
                    </div>
                    <div className="about-container">
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;