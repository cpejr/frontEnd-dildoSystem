import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'
import { FiFilter } from 'react-icons/fi';

// props.filters = {
//     max_price: Número representando preço máximo
//     min_price: Número representando preço mínimo
//     order_by: Booleano que indica se resultados devem ser ordenados 
//         por preço (vai usar o preço certo)
//     order_ascending: Booleano que indica ordem crescente ou decrescente
//         (true para crescente)
//     search: string com o nome pesquisado
//     subcategory_id: id da subcategoria em que se pesquisa
// }

export default function ProductCard(props) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);

    const config = {
        headers: { 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQXJ0aHVyIiwiZmlyZWJhc2UiOiJNcG4yNzNRZEVsY3hxdllZc3VGdU9lMk5IRTYzIiwidHlwZSI6ImFkbWluIiwiY3BmIjoiMTUxMTIzNTg0MzkiLCJiaXJ0aGRhdGUiOiIwOS8wMS8yMDAxIiwiemlwY29kZSI6IjMxNzU4NDQiLCJwaG9uZW51bWJlciI6Ijk4NTc0NjczODQiLCJzdGF0ZSI6Ik1pbmFzIEdlcmFpcyIsImNpdHkiOiJCZWxvIEhvcml6b250ZSIsIm5laWdoYm9yaG9vZCI6IlVuacOjbyIsInN0cmVldCI6Ik5lbHNvbiIsIm51bWJlciI6IjEyMyIsImNvbXBsZW1lbnQiOiJhcHQgMTAxIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDgtMTAgMTQ6NTk6MjMiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wOC0xMCAxNDo1OToyMyIsImFwcHJvdmVkIjoiZmFsc2UifSwiaWF0IjoxNTk3MDkxNTk4LCJleHAiOjE1OTk2ODM1OTh9.2okxqbbhK9CPvHxhwnaUfBLuJu_cG73kwUyaZf_9ryU' }
    }

    useEffect(() => {
        let newQueries = '';
        const keys = Object.keys(props.filters);
        keys.forEach(key => {
            if(props.filters[key]) {
                newQueries += `&${key}=${props.filters[key]}`;
            }
        });
        setQueries(newQueries);

        const url = `products?page=${page}${newQueries}`
        
        api.get(url, config).then(response => {
            setProducts(response.data) 
            console.log(response.data)
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    };

    async function loadFollowingPage() {
        const currentPos = scrollPosition;

        const url = `products?page=${page+1}${queries}`;

        const nextPage = await api.get(url, config);
        setProducts([...products, ...nextPage.data]);
        setPage(page+1);
        window.scrollTo(0, currentPos);
    }

    return (
        <div className="products-container-wrapper">
            <div className="products-container">
                {products.map(product => (

                    <div className="Card">
                        <Link to="">
                            <img src={`https://docs.google.com/uc?id=${product.image_id}`} alt={product.name} />
                            <p id="titulo-card">
                                {product.name}
                            </p>
                        </Link>

                        <span id="preco-card">{`R$ ${Number(product.client_price).toFixed(2)}`}</span>

                        <Link id="botao-comprar" to="">
                            <span>COMPRAR</span>
                        </Link>

                    </div>
                ))}
            </div>
            <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button>
        </div>

    )
}