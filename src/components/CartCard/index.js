import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ImageLoader from 'react-loading-image';

import "./styles.css"
import { Button } from "@material-ui/core";
import cart from "../../services/cart"

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


function CartCard(props) {
    const [productQuantity, setProductQuantity] = useState(1);

    function sumQuantity() {
        setProductQuantity(productQuantity + 1)
    }
    function lessQuantity() {
        if (productQuantity > 0) {
            setProductQuantity(productQuantity - 1)
        }
    }

    return (
        <>
            <div className="cart-card">
                <div className="cart-img">
                    {/* <ImageLoader
                        src={`https://docs.google.com/uc?id=${}`}
                        loading={() => <img src={} alt="Loading..." />}
                        error={() => <div>Error</div>} /> */}
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
                                <Button onClick={() => { lessQuantity() }} ><RemoveCircleIcon className="less" size={25} /></Button>
                                <p>{productQuantity}</p>
                                <Button onClick={() => { sumQuantity() }} ><AddCircleIcon size={25} /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="delete-price">
                        <div>
                            <MdDeleteForever className="delete" size={30} onClick={(e) => cart.deleteItem(props.productId)} />
                        </div>

                        <PriceElement product={props} />
                        {/* <div className="full-price">
                            <p>R$ 30,00</p>
                        </div>
                        <div className="discount-price">
                            <p>R$ 25,00</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="borderEmpty"></div>
        </>
    );
}

export default CartCard;