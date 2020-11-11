import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import CreateIcon from '@material-ui/icons/Create';
import '../ProductEditor';
import api from '../../services/api';
import { FaPlusCircle, FaMinusCircle, FaHeart } from 'react-icons/fa';

import './styles.css'
import loading from '../../images/Loading.gif';

import Inventory from "./InventoryCard"

export default function InventoryCard(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [relevantStock, setRelevantStock] = useState();
    const accessToken = localStorage.getItem('accessToken');

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    useEffect(() => {
        let newQueries = '';

        console.log(props)

        if (props.search) newQueries += `&search=${props.search}`;
        if (props.categoryId) newQueries += `&category_id=${props.categoryId}`;

        setQueries(newQueries);

        const url = `products?page=${page}${newQueries}`;
        console.log(url);

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

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
                    <Inventory product={product} />
                ))}
            </div>
            <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button>
        </div>

    )
} 




