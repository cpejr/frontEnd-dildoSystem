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
      <div id="TextoFooter">
        <p>
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown 
          printer took a gallery of type and scrambled.
        </p>
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
        <Link to="/conditions" className="term-link">
          Acesse nossos termos de uso e nossa política de privacidade.
        </Link>
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
