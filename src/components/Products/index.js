import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';
import CreateIcon from '@material-ui/icons/Create';
import '../../components/ProductEditor';
import api from '../../services/api';

import './styles.css'
import loading from '../../images/Loading.gif';

export default function Product(props) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);

    const accessToken = localStorage.getItem('accessToken')

    const config = {
        headers: { 'authorization': `Bearer ${accessToken}` }
    }

    useEffect(() => {
        let newQueries = '';
        const keys = Object.keys(props.filters);
        keys.forEach(key => {
            if (props.filters[key]) {
                newQueries += `&${key}=${props.filters[key]}`;
            }
        });

        setQueries(newQueries);

        const url = `products?page=${page}${newQueries}`;
        console.log(url);

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


    }, [props.filters]);

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
        <div className="products-container-wrapper">
            <div className="products-container">
                {products.map(product => (
                    <div className="Card">
                        <Link to={`/product/${product.id}`} className="image-text-container">
                            <ImageLoader
                                src={`https://docs.google.com/uc?id=${product.image_id}`}
                                loading={() => <img src={loading} alt="Loading..." />}
                                error={() => <div>Error</div>} />
                            <p id="titulo-card">
                                {product.name}
                            </p>
                        </Link>

                        <Link id="botao-editar" to={{
                            pathname:`/admin/editproduct/${product.id}`,
                            state: product
                            }}>
                            <span className="d-flex align-center justify-center">EDITAR<CreateIcon /></span>
                        </Link>

                    </div>
                ))}
            </div>
            <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button>
        </div>

    )
}