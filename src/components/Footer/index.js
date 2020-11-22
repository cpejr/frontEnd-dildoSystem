import React from "react";
import "./style.css";
import Logos from "../../images/CASULUS02.svg";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="FooterWrapper">
      <div id="LogoFooter">
        <img className="logos" src={Logos} alt="logos" />
      </div>
      <div className="TextoFooter">
        <div className="textos-footer">
        <div id="texto-institucional">
         <h3>Institucional</h3>
         <Link to="/about" className="term-link">
          Quem Somos
        </Link>
        <Link to="/conditions" className="term-link">
          Termos de uso e política de privacidade.
        </Link>
        <Link to="/about" className="term-link">
          Como comprar
        </Link>
        <Link to="/about" className="term-link">
          Seja um(a) revendedor(a)
        </Link>
        </div>
        <div id="texto-ajuda">
         <h3>Ajuda</h3>
         <Link to="/about" className="term-link">
          Fale conosco
        </Link>
        <Link to="/about" className="term-link">
          Perguntas frequentes
        </Link>
        </div>
        </div>
        <div className="icons">
            <a className="footer-buttons">
            <WhatsAppIcon />
            </a>
            <a className="footer-buttons">
            <FacebookIcon />
            </a>
            <a className="footer-buttons" href="https://www.instagram.com/casulus.sex" color="primary">
            <InstagramIcon />
            </a>
            <a className="footer-buttons">
            <TwitterIcon />
            </a>
        </div>
      </div>
      <div id="ContatoFooter">
        <span>
          Contato: <br /> <br />
          sklep@uikit.com <br />
          Hotline: +46 131 138 138
        </span>
      </div>
    </div>
    </div>
  );
}
