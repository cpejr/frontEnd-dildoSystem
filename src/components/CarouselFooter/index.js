import React, { useState, useEffect } from "react";
import "./styles.css";
import truck from '../../images/truck.png';
import packaging from '../../images/packaging.png';
import money from '../../images/money.png';

export default function CarouselFooter() {


    return (
        <div className="FooterCarousel">
            <div className="FooterCarousel-item">
                <img src={truck}/>

                <p>
                    FRETE GRÁTIS ACIMA DE 299,00 <br />
          ENTREGA RÁPIDA OU RETIRE GRÁTIS
        </p>
            </div>
            <div className="FooterCarousel-item">
            <img src={packaging}/>
                <p>
                    EMBALAGENS DISCRETAS
        </p>
            </div>
            <div className="FooterCarousel-item">
            <img src={money}/>
                <p>
                    PARCELE SEM JUROS<br />
          DESCONTO À VISTA
        </p>
            </div>
        </div>

    );
}
