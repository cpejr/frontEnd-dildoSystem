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
      <div className="TextoFooter">
        <div className="textos-footer">
        <div id="texto-institucional">
         <h3>Info</h3>
         <Link to="/about" className="term-link">
          Moda sensual
        </Link>
        <Link to="/conditions" className="term-link">
          Para elas
        </Link>
        <Link to="/about" className="term-link">
          Para eles
        </Link>
        <Link to="/about" className="term-link">
          Saindo da rotina
        </Link>
        <Link to="/about" className="term-link">
          Sexo anal
        </Link>
        <Link to="/about" className="term-link">
          Higiene e banho
        </Link>
        <Link to="/about" className="term-link">
          Acessórios BDSM
        </Link>
        <Link to="/about" className="term-link">
          Especiais
        </Link>
        </div>
        <div id="texto-ajuda">
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
        <div id="ContatoFooter">
        <h3>Contato</h3>
        <Link to="/about" className="term-link">
          Email
        </Link>
        <Link to="/conditions" className="term-link">
          Whatsapp
        </Link>
        <Link to="/about" className="term-link">
          Instagram
        </Link>
        <Link to="/about" className="term-link">
          Perguntas frequentes
        </Link>
      </div>
        </div>
      </div>
      <div id="LogoFooter">
        <img className="logos" src={Logos} alt="logos" />
      </div>
    </div>
    </div>
  );
}
