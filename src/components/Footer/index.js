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
            <WhatsAppIcon />
            <FacebookIcon />
            <InstagramIcon/>
            <TwitterIcon />
        </div>
      </div>
      <div id="ContatoFooter">
        <spam>
          Contato: <br /> <br />
          sklep@uikit.com <br />
          Hotline: +46 131 138 138
        </spam>
      </div>
    </div>
    </div>
  );
}
