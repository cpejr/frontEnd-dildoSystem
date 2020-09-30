import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ImageLoader from 'react-loading-image';
import loading from '../../images/Loading.gif';
import { Link } from 'react-router-dom';

import "./styles.css"
import { Button } from "@material-ui/core";
import cart from "../../services/cart"

function PriceElement(props) {

    const product = props.product.product;

    if (product.wholesaler_price) {
        if (product.on_sale_wholesaler) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(product.wholesaler_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(product.wholesaler_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <div className="price-container">
                    <span className="preco-card">{`R$ ${Number(product.wholesaler_price).toFixed(2)}`}</span>
                </div>)

        }
    } else {
        if (product.on_sale_client) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(product.client_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(product.client_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <span className="preco-card">{`R$ ${Number(product.client_price).toFixed(2)}`}</span>
            )
        }
    }
}


function CartCard(props) {
    const [productQuantity, setProductQuantity] = useState(props.product.quantity);
    const [isVisible, setIsVisible] = useState(true);




    function sumQuantity(productId) {
        setProductQuantity(productQuantity + 1)
        let cart = JSON.parse(localStorage.cart);
        for (var i = 0; i < cart.length; i++) {
            if (productId === cart[i].product.id) {  //look for match with name
                cart[i].quantity += 1;  //add two
                break;  //exit loop since you found the person
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    function lessQuantity(productId) {
        if (productQuantity > 0) {
            setProductQuantity(productQuantity - 1)
            let cart = JSON.parse(localStorage.cart);
            for (var i = 0; i < cart.length; i++) {
                if (productId === cart[i].product.id) {  //look for match with name
                    cart[i].quantity -= 1;  //add two
                    break;  //exit loop since you found the person
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    return (
        <>
            <div className="cart-card">
                <div className="cart-img">

                    <Link to={`/product/${props.productId}`} className="image-text-container">
                        <ImageLoader
                            src={`https://docs.google.com/uc?id=${props.image_id}`}
                            loading={() => <img src={loading} alt="Loading..." />}
                            error={() => <div>Error</div>} />
                    </Link>

                    {/* <div className="empty"></div> */}
                </div>
                <div className="cardText">
                    <div className="info-text">
                        <div>
                            <h4>{props.name}</h4>
                        </div>
                        <div className="description">
                            <p>{props.description}</p>
                        </div>
                        <div className="size-quantity">
                            {/* <div>
                                <select name="size" id="size">
                                    <option value="unico">Tamanho único</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                </select>
                            </div> */}
                            <div className="itemQuantity">
                                <Button onClick={() => { lessQuantity(props.productId) }} ><RemoveCircleIcon className="less" size={25} /></Button>
                                <p>{productQuantity}</p>
                                <Button onClick={() => { sumQuantity(props.productId) }} ><AddCircleIcon size={25} /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="delete-price">
                        <div>
                            <MdDeleteForever className="delete" size={30} onClick={(e) => { cart.deleteItem(props.productId); setIsVisible(false) }} />
                        </div>

                        <PriceElement product={props.product} />
                    </div>
                </div>
            </div>
            <div className="borderEmpty"></div>
        </>
    );
}

export default CartCard;