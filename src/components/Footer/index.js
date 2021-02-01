import React, { useEffect, useState } from "react";
import "./style.css";
import Logos from "../../images/CASULUS_LOGOTEXTO_PRETO.png";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import {Link} from 'react-router-dom';

import api from "../../services/api";

export default function Footer() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    api.get("categories").then((response) => {
      setCategories(response.data);
    })
  }, [])


  return (
    <div className="Footer">
      <div className="FooterWrapper">
      <div className="TextoFooter">
        <div className="textos-footer">
        <div id="texto-institucional">
         <h3>Info</h3>
         {
           categories.map((categoria)=>(
            <Link to={`/search?category_id=${categoria.id}`} className="term-link">
            {categoria.name}
          </Link>
           )
           )
         }
         {/* <Link to="/search?category_id=693b6b10-2a64-11eb-93d6-615250937529" className="term-link">
          Moda sensual
        </Link>
        <Link to="/search?category_id=c6169700-22e0-11eb-8d75-214996dae135" className="term-link">
          Para elas
        </Link>
        <Link to="/search?category_id=cc5ae620-22e0-11eb-8d75-214996dae135" className="term-link">
          Para eles
        </Link>
        <Link to="/search?category_id=d206ece0-22e0-11eb-8d75-214996dae135" className="term-link">
          Saindo da rotina
        </Link>
        <Link to="/search?category_id=d82a6d90-22e0-11eb-8d75-214996dae135" className="term-link">
          Sexo anal
        </Link>
        <Link to="/search?category_id=dda48ee0-22e0-11eb-8d75-214996dae135" className="term-link">
          Higiene e banho
        </Link>
        <Link to="/search?category_id=e5bcdab0-22e0-11eb-8d75-214996dae135" className="term-link">
          Acessórios BDSM
        </Link> */}
        </div>
        <div id="texto-ajuda">
         <h3>Institucional</h3>
         <Link to="/about" className="term-link">
          Quem Somos
        </Link>
        <Link to="/conditions" className="term-link">
          Termos de uso e política de privacidade.
        </Link>
        <Link to="/about2" className="term-link">
          Como comprar
        </Link>
        <Link to="/about2" className="term-link">
          Seja um(a) revendedor(a)
        </Link>
        </div>
        <div id="ContatoFooter">
        <h3>Contato</h3>
        <div className="term-link">
          lojacasulus@gmail.com
        </div>
        <a className="term-link" href="https://web.whatsapp.com/send?phone=5562993229837" target="_blank">
          Whatsapp: (62) 99322-9837
        </a>
        <a href="https://instagram.com/casulus.sex" className="term-link" target="_blank" rel="noopener noreferrer">
          Instagram: @casulus.sex
        </a>
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
