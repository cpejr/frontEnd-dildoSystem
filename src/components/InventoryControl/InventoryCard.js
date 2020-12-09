import React, { useState, useEffect } from 'react';
import ImageLoader from 'react-loading-image';
import { Button } from "@material-ui/core";
import '../ProductEditor';
import api from '../../services/api';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import './styles.css'
import loading from '../../images/Loading.gif';

export default function InventoryCard(props) {
    const product = props.product;
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');
    const [scrollPosition, setSrollPosition] = useState(0);
    const [quantity, setQuantity] = useState(product.stock_quantity);
    const [minimum, setMinimum] = useState(product.min_stock);
    
    const accessToken = localStorage.getItem("accessToken");
    const config = {
        headers: { authorization: `Bearer ${accessToken}` },
      };

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    function incrementMinimum() {
        setMinimum(minimum + 1);
    }

    function decrementMinimum() {
        if (minimum > 1)
            setMinimum(minimum - 1);

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

    const updateStock = async (e) => {
        e.preventDefault();
        let data = new FormData();
        function addToData(key, value) {
            if (value !== undefined && value !== "") data.append(key, value);
        }

        addToData("name", product.name);
        addToData("description", product.description);
        addToData("client_price", product.client_price);
        addToData("client_sale_price", product.client_sale_price);
        addToData("wholesaler_price", product.wholesaler_price);
        addToData("wholesaler_sale_price", product.wholesaler_sale_price);
        addToData("stock_quantity", quantity);
        addToData("min_stock", minimum);
        addToData("visible", product.visible);
        addToData("on_sale_client", product.on_sale_client);
        addToData("on_sale_wholesaler", product.on_sale_wholesaler);
        addToData('best_seller', product.best_seller);
        addToData('release', product.release);
        addToData("subcategory_id", product.subcategory_id);
        addToData("weight", product.weight);
        addToData("height", product.height);
        addToData("width", product.width);
        addToData("length", product.length);

        try {
            await api.put(
                `updateProduct/${product.id}`,
                data,
                config
            );
            notification.open({
                message: 'Sucesso!',
                description:
                  'Edição concluída.',
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
                style: {
                  width: 600,
                },
              });
        } catch (err) {
            console.log(JSON.stringify(err));
            console.err(err.response);
            notification.open({
                message: 'Erro!',
                description:
                  'Edição impedida.',
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
                style: {
                  width: 600,
                },
              });
        }
    }

    return (
        <div className="inventory-card">
            <ImageLoader
                src={`https://docs.google.com/uc?id=${product.image_id}`}
                loading={() => <img src={loading} alt="Loading..." />}
                error={() => <div>Error</div>} />
            <p id="titulo-card">
                {product.name}
            </p>
            <h5>Estoque:</h5>
            <h6>Quantidade:</h6>
            <div className="d-flex align-items-center justify-content-center mb-2 ">
                <FaMinusCircle onClick={decrementQuantity} size={23} style={{ color: "#686d76" }} className="mr-2" />
                <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control w-25"
                />
                <FaPlusCircle onClick={incrementQuantity} size={23} className="ml-2" />
            </div>
            <h6>Mínimo:</h6>
            <div className="d-flex align-items-center justify-content-center mb-2 ">
                <FaMinusCircle onClick={decrementMinimum} size={23} style={{ color: "#686d76" }} className="mr-2" />
                <input
                    type="text"
                    value={minimum}
                    onChange={(e) => setMinimum(e.target.value)}
                    className="form-control w-25"
                />
                <FaPlusCircle onClick={incrementMinimum} size={23} className="ml-2" />
            </div>
            <Button onClick={(e) => { updateStock(e) }} >Salvar</Button>

        </div>
    )
}
