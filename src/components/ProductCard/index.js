import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';

import api from '../../services/api';
import cart from "../../services/cart"

import './styles.css'
import loading from '../../images/Loading.gif';



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

    const [requiring, setRequiring] = useState(false);
    const alreadyRequiring = useRef(false);


    function handleScroll() {
        const shouldUpdate = window.pageYOffset > (document.documentElement.scrollHeight - 1300)
        if(shouldUpdate && !requiring.current) {
            alreadyRequiring.current = true;
            setRequiring(true);
            console.log(requiring);
        }
    }

    useEffect(() => {
        if(!props.featuredOnly) {
            window.addEventListener('scroll', handleScroll, {passive:true});
        }
        

        return (() => {
            if(!props.featuredOnly) {
                 window.removeEventListener('scroll', handleScroll);
            }
        });
    }, []);

    useEffect(() => {
        if(!requiring) {
            alreadyRequiring.current = false;
        }
        
        if(alreadyRequiring.current && requiring) {
            loadFollowingPage();
        } 
    }, [requiring])

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

        let queries = props.location.search;

        queries ? queries += '&' : queries = '?';

        setQueries(queries);

        let url = `/products/${queries}page=${page}`

        if (props.featuredOnly) url += '&featured=true';

        console.log('url when loading products', url);

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
    }, [props.location.search])

    useEffect(() => {
        console.log('novo array de products',products);
    }, [products])

    async function loadFollowingPage() {
        const currentPos = window.pageYOffset;

        let reqQueries = queries;

        reqQueries ? reqQueries += '' : reqQueries = '?';

        let url = `/products/${reqQueries}page=${page + 1}`

        if (props.featuredOnly) url += '&featured=true';

        console.log(url);

        let nextPage;

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

        if (accessToken) {
            nextPage = await api.get(url, config);
        } else {
            nextPage = await api.get(url);
        }

        setProducts(products.concat(nextPage.data));
        setPage(page + 1);
        setRequiring(false);
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

                        <Link id="botao-comprar" to="/cart">
                            <span onClick={(e) => cart.addItem(product)}>COMPRAR</span>
                        </Link>

                    </div>
                ))}
            </div>
            {/* <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button> */}
        </div>

    )
});