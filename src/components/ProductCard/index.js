import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

export default function ProductCard(props) {

    const [products, setProducts] = useState([]);

    var config = {
        headers: { 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwibmFtZSI6IkFydGh1ciIsImVtYWlsIjoiQXJ0aHVyMkBnbWFpbC5jb20iLCJmaXJlYmFzZSI6Ik1wbjI3M1FkRWxjeHF2WVlzdUZ1T2UyTkhFNjMiLCJ0eXBlIjoiYWRtaW4iLCJjcGYiOiIxNTExMjM1ODQzOSIsImJpcnRoZGF0ZSI6IjA5LzAxLzIwMDEiLCJ6aXBjb2RlIjoiMzE3NTg0NCIsInBob25lbnVtYmVyIjoiOTg1NzQ2NzM4NCIsInN0YXRlIjoiTWluYXMgR2VyYWlzIiwiY2l0eSI6IkJlbG8gSG9yaXpvbnRlIiwibmVpZ2hib3Job29kIjoiVW5pw6NvIiwic3RyZWV0IjoiTmVsc29uIiwibnVtYmVyIjoiMTIzIiwiY29tcGxlbWVudCI6ImFwdCAxMDEiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0wNSAyMTo1NjozOCIsInVwZGF0ZWRfYXQiOiIyMDIwLTA1LTA1IDIxOjU2OjM4In0sImlhdCI6MTU5NDc1OTkxMiwiZXhwIjoxNTk3MzUxOTEyfQ.QYtnKluLPjux8TmPzeOei3MHEY3PEEAdccKS6o8xOZM' }
    }

    useEffect(() => {
        api.get('products', config).then(response => {
            setProducts(response.data)
            console.log(response.data)
        });
    }, [])

    return (
        <div>
            {products.map(product => (

                <div className="Card">
                    <Link to="">
                        <img src="" alt={product.img} />
                    </Link>

                    <p id="titulo-card">
                        {product.titulo}
                    </p>

                    <span id="preco-card">{product.preco}</span>

                    <Link id="botao-comprar" to="">
                        <span>COMPRAR</span>
                    </Link>

                </div>
            ))}
        </div>
    )
}