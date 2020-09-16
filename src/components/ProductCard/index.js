import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';

import api from '../../services/api';
import cart from "../../services/cart"

import './styles.css'
import loading from '../../images/Loading.gif';


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

function PriceElement(props) {

    const product = props.product;

    if (product.wholesaler_price) {
        if (product.on_sale_wholesaler) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(props.product.wholesaler_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(props.product.wholesaler_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <div className="price-container">
                    <span className="preco-card">{`R$ ${Number(props.product.wholesaler_price).toFixed(2)}`}</span>
                </div>)

        }
    } else {
        if (product.on_sale_client) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(props.product.client_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(props.product.client_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <span className="preco-card">{`R$ ${Number(props.product.client_price).toFixed(2)}`}</span>
            )
        }
    }
}

export default withRouter(function ProductCard(props) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);

    const accessToken = localStorage.getItem('accessToken')

    const config = {
        headers: { 'authorization': `Bearer ${accessToken}` }
    }

    useEffect(() => {
        let queries = props.location.search;
        
        queries ? queries += '&' : queries = '?';

        let url=`/products/${queries}page=${page}`

        if(props.featuredOnly) url += '&featured=true';

        console.log('url when loading products',url);
        
        if (accessToken) {
            api.get(url, config).then(response => {
                setProducts(response.data)
                console.log(response.data)
            });
        } else {
            api.get(url).then(response => {
                setProducts(response.data)
                console.log(response.data)
            });
        }
    }, [page, props.location.search])

    // useEffect(() => {
    //     let newQueries = '';
    //     const keys = Object.keys(props.filters);
    //     keys.forEach(key => {
    //         if (props.filters[key]) {
    //             newQueries += `&${key}=${props.filters[key]}`;
    //         }
    //     });

    //     setQueries(newQueries);

    //     const url = `products?page=${page}${newQueries}`;
    //     console.log(url);

    //     if(!props.search || props.filters.search)
    //     {
    //         if (accessToken) {
    //         api.get(url, config).then(response => {
    //             setProducts(response.data)
    //             console.log(response.data)
    //         });
    //     } else {
    //         api.get(url).then(response => {
    //             setProducts(response.data)
    //             console.log(response.data)
    //         });
    //     }
    //     }



    // }, [props.filters]);

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

        const url = `products?page=${page + 1}${queries}`;

        let nextPage;

        if (accessToken) {
            nextPage = await api.get(url, config);
        } else {
            nextPage = await api.get(url);
        }

        setProducts([...products, ...nextPage.data]);
        setPage(page + 1);
        window.scrollTo(0, currentPos);
    }

    return (
        <div className={`products-container-wrapper ${props.className}`}>
            <div className="products-container">
                {products.map(product => (

                    <div className="Card" key={`product-${product.id}`}>
                        <Link to={`/product/${product.id}`} className="image-text-container">
                            <ImageLoader
                                src={`https://docs.google.com/uc?id=${product.image_id}`}
                                loading={() => <img src={loading} alt="Loading..." />}
                                error={() => <div>Error</div>} />
                            <p id="titulo-card">
                                {product.name}
                            </p>
                        </Link>

                        <PriceElement product={product} />

                        <Link id="botao-comprar" to="">
                            <span>COMPRAR</span>
                        </Link>

                    </div>
                ))}
            </div>
            <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button>
        </div>

    )
});