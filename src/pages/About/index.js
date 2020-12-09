import React from "react";
import { GoVerified, GoMegaphone } from "react-icons/go";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import Inst1 from "../../images/inst1.jpg";
import Inst2 from "../../images/inst2.jpg";
import Inst3 from "../../images/inst3.jpg";
import Inst4 from "../../images/inst4.jpg";
import Inst5 from "../../images/inst5.jpg";

import "./styles.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <Header />
      <div className="about-content">
        <h2>Institucional</h2>
        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst1} alt="institucional1"></img>
              </div>
              <div className="about-paragraph">
                <h3>Quem Somos</h3>
                <p>
                        A Casulus é uma empresa que surgiu da necessidade de atender
                  pessoas, em especial mulheres, que não se identificavam com os
                  “tradicionais sexshops”. A ideia foi revolucionar o mercado
                  erótico e desconstruir estereótipos em relação ao sexo e à
                  sexualidade.
                </p>
              </div>
            </div>
            <p>
                    A loja conta hoje com espaço físico, uma boutique que foi
              planejada para trazer conforto e modernidade aos clientes, e
              também estar presente no meio digital, tanto no site como nas
              principais redes sociais.
            </p>
          </div>
        </div>

        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst5} alt="institucional1"></img>
              </div>
              <div className="about-paragraph">
                <h3>Missão</h3>
                <p>
                        Ser uma empresa que entende e atende as necessidades de nossos
                  clientes, com um atendimento diferenciado e humanizado,
                  oferecendo confiança e qualidade, a preço justo.
                </p>
                <h3>Visão</h3>
                <p>
                        Ajudar a descontruir mitos e tabus em relação ao sexo e a
                  sexualidade, e falar de maneira mais descontraída sobre
                  produtos eróticos.
                </p>
                <h3>Valores</h3>
                <p> Foco no cliente, integridade e credibilidade.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst2} alt="institucional1"></img>
              </div>
              <div className="about-paragraph">
                <h3>Oferecemos aos clientes</h3>
                <p>
                        Experiência de compra personalizada, em um ambiente que traz
                  conforto e aconchego. Além disso, trabalhamos com preços
                  justos e com várias formas de pagamento (depósito/
                  transferência bancária, boleto, cartão de débito e
                  crédito, e parcelamentos). A empresa conta também com
                  novidades frequentes e lançamentos exclusivos em todas as
                  categorias de produtos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst3} alt="institucional1"></img>
              </div>
              <div className="about-paragraph">
                <h3>Nossos produtos</h3>
                <p>
                        Trabalhamos com as melhores marcas do segmento erótico,
                  nacionais e importadas, de todas as categorias, inclusive moda
                  sensual. Para oferecer qualidade e inovação aos nossos
                  clientes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-institutional">
          <div className="about-container">
            <div className="justified-about-container">
              <div className="inst-image">
                <img src={Inst4} alt="institucional1"></img>
              </div>
              <div className="about-paragraph">
                <h3>Entregas</h3>
                <p>
                        Experiência de compra personalizada, em um ambiente que traz
                  conforto e aconchego. Além disso, trabalhamos com preços
                  justos e com várias formas de pagamento (depósito/
                  transferência bancária, boleto, cartão de débito frequentes e
                  crédito, e parcelamentos). A empresa conta também com
                  novidades frequentes e lançamentos exclusivos em todas as
                  categorias de produtos.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default About;
