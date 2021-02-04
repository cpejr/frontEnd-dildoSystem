import React, { useState, useEffect } from 'react';
import '../ProductEditor';
import api from '../../services/api';

import './styles.css'

import Inventory from "./InventoryCard"

export default function InventoryCard(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);
    //const [quantity, setQuantity] = useState(1);
    //const [relevantStock, setRelevantStock] = useState();
    //const accessToken = localStorage.getItem('accessToken');

    // function incrementQuantity() {
    //     setQuantity(quantity + 1);
    // }

    // function decrementQuantity() {
    //     if (quantity > 1)
    //         setQuantity(quantity - 1);
    // }

    const [change, setChange] = useState(false);

    useEffect(() => {
        let newQueries = '';

        if (props.search) newQueries += `&search=${props.search}`;
        if (props.categoryId) newQueries += `&category_id=${props.categoryId}`;

        setQueries(newQueries);

        const url = `products?page=${page}${newQueries}`;

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

        if (accessToken) {
            api.get(url, config).then(response => {
                setProducts(response.data)
                setChange(!change)
                console.log('products dentro do inventory page: ', response.data)
            });
        } else {
            api.get(url).then(response => {
                setProducts(response.data)
                setChange(!change)
                console.log('products dentro do inventory page: ', response.data)
            });
        }


    }, [props.search, props.categoryId]);

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

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

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
                    <Inventory product={product} search={props.search} change={change}/>
                ))}
            </div>
            <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button>
        </div>

    )
} 




