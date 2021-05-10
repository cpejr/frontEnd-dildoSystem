import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';
import { FaHeart } from 'react-icons/fa';

import { LoginContext } from '../../Contexts/LoginContext';
import './newStyles.css'
import loading from '../../images/Loading.gif';

import api from '../../services/api';
import ProductModal from './ProductModal';
import urlAWS from '../../services/imagesAWS'

export function PriceElement(props) {

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

export default function NewProductCard(props) {
    const [isWish, setIsWish] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const user = useContext(LoginContext);
    const accessToken = localStorage.getItem('accessToken');
    const product = props.product;
    const subproducts = product.subproducts;

    const config = {
        headers: { authorization: `Bearer ${accessToken}` }
    }

    const handleAddWishList = (product_id) => {
        const user_id = user.id
        const data = {
            user_id,
            product_id
        }
        api.post(`userwishlist/${user_id}`, data, config).then((response) => {

            setIsWish(true);
        })
    }
    const handleRemoveWishList = (product_id) => {
        const user_id = user.id
        const config_2 = {
            headers: { authorization: `Bearer ${accessToken}` },
            data: { user_id: user_id, product_id }
        };
        api.delete('userwishlist', config_2).then((response) => {

            setIsWish(false);
        })
    }

    function buyButton() {

        if ((subproducts && subproducts.length > 0 && subproducts.find(subp => subp.stock_quantity > 0)) || product.stock_quantity > 0) {
            return (
                <div id="botao-comprar" onClick={(e) => setVisibleModal(true)}>
                    <span >COLOCAR NO CARRINHO</span>
                </div>
            )
        }
        // } else {
        //     return (
        //         <div id="unavailable-label">
        //             <span>INDISPONÍVEL</span>
        //         </div>
        //     )
        // }
    }

    useEffect(() => {
        if (product) {
            const user_id = user.id;
            api.get(`userwishlist/${user_id}`, config).then((response) => {
                const result = response.data.find(p => p.id === product.id);
                if (result) {
                    setIsWish(true);
                }
            });
        }
    }, [product])

    function DiscountElement(props) {

        const product = props.product;

        if ((subproducts && subproducts.length > 0 && subproducts.find(subp => subp.stock_quantity > 0)) || product.stock_quantity > 0) {
            if (product.wholesaler_price) {
                if (product.on_sale_wholesaler) {
                    return (
                        <div className="price-container">
                            <p className="preco-card discount">{`${Math.round(Number(((props.product.wholesaler_price - props.product.wholesaler_sale_price) / (props.product.wholesaler_price)) * 100))}% DESCONTO`}</p>

                            {/* <p className="preco-promocao">
                            {`R$ ${Number(props.product.wholesaler_sale_price).toFixed(2)}`}
                        </p> */}
                        </div>
                    )
                } else {
                    return (
                        <div className="price-container">
                            {/* <span className="preco-card">{`R$ ${Number(props.product.wholesaler_price).toFixed(2)}`}</span> */}
                        </div>)

                }
            } else {
                if (product.on_sale_client) {
                    return (
                        <div className="price-container">
                            <p className="preco-card discount">{`${Math.round(Number(((props.product.client_price - props.product.client_sale_price) / (props.product.client_price)) * 100).toFixed(2))}% DESCONTO`}</p>

                            {/* <p className="preco-promocao">
                            {`R$ ${Number(props.product.client_sale_price).toFixed(2)}`}
                        </p> */}
                        </div>
                    )
                } else {
                    return (
                        <div></div>
                        // <span className="preco-card">{`R$ ${Number(props.product.client_price).toFixed(2)}`}</span>
                    )
                }
            }
        } else {
            return (
                <div className="unavailable-label">
                    <p className="unavailable-product">INDISPONÍVEL</p>
                </div>
            )
        }
    }

    return (
        <div className="Card" key={`product-${product.id}`}>
            <div className='wish-heart'>
                {!isWish && <FiHeart className="fiheart-product" onClick={() => handleAddWishList(product.id)} />}
                {isWish && <FaHeart className="fiheart-product" onClick={() => handleRemoveWishList(product.id)} />}
            </div>
            <div className='product-image'>
                <Link to={`/product/${product.id}`} className="image-text-container">
                    <ImageLoader
                        src={`${urlAWS}/${product.image_id}`}
                        loading={() => <img src={loading} alt="Loading..." />}
                        error={() => <div>Error</div>} />
                </Link>
                {product && buyButton()}
            </div>


            <DiscountElement product={product} />
            <p id="titulo-card">
                {product.name}
            </p>
            <PriceElement product={product} />

            <ProductModal product={product} visible={visibleModal} onCancel={() => setVisibleModal(false)} />

        </div>
    )
}

