import React from 'react';
import { Link } from 'react-router-dom';
import { GoVerified, GoMegaphone } from 'react-icons/go';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaShippingFast } from 'react-icons/fa';
import Inst3 from '../../images/inst3.jpg';
import Inst5 from '../../images/inst5.jpg';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

const About = function () {
  return (
    <>
      <Header />
      <div className="about-content">
        <h2>Institucional</h2>
        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst3} alt="institucional1" />
              </div>
              <div className="about-paragraph">
                <h3>Como comprar</h3>
                <p>
                  Como comprar na Casulus? É muito fácil!
                  {' '}
                  <br />
                  <br />
                  Primeiro clique em
                  “cadastrar”
                  e preencha com os seus dados.
                  {' '}
                  <br />
                  <br />
                  Depois de efetuar o cadastro, você já está pronto para começar as suas compras.
                  <br />
                  <br />
                  Ao escolher todos os produtos desejados, clique no carrinho de compras e escolha
                  a forma de pagamento e o endereço para envio, ou escolha a opção retirada para
                  buscar o produto na loja.
                  <br />
                  <br />
                  Efetue o pagamento, e se preferir pode nos mandar o comprovante de pagamento pelo
                  e-mail ou WhatsApp para agilizarmos seu pedido.
                  <br />
                  <br />
                  Os produtos, só serão separados mediante a confirmação pagamento. Após a separação,
                  seu pedido será devidamente embalado para envio ou retirada.
                  <br />
                  <br />
                  Se você tiver qualquer dúvida durante alguma etapa, entre em contato para que possamos te ajudar.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst5} alt="institucional1" />
              </div>
              <div className="about-paragraph">
                <h3>Seja um(a) revendedor(a)</h3>
                <p>
                  Se você deseja comprar nossos produtos no Atacado para revender,
                  o primeiro passo é clicar em “cadastrar”, preencher com os seus dados
                  e escolher o tipo “Atacadista”. Depois disso entraremos em contato
                  com você e em seguida, você receberá um e-mail confirmando a liberação
                  de cadastro. Pronto! Você já terá acesso aos nossos preços especiais,
                  podendo já efetuar suas compras e começar suas vendas.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default About;
