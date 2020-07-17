import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css'

export default function ProductCard (props) {
    return(
        <div className="Card">
            <Link to="">
                <img src="" alt={props.img}/>
            </Link>

            <p id="titulo-card">
                {props.titulo}
            </p>

            <span id="preco-card">{props.preco}</span>

            <Link id="botao-comprar" to="">
                <span>COMPRAR</span>
            </Link>
            
        </div>
    )
}