import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import "./styles.css"
import { Button } from "@material-ui/core";


function CartCard(props) {
    const [productQuantity, setProductQuantity] = useState(1);

    function sumQuantity() {
        setProductQuantity(productQuantity + 1)
    }
    function lessQuantity() {
        if(productQuantity > 0){
        setProductQuantity(productQuantity - 1)
        }
    }

    return (
        <>
            <div className="cart-card">
                <div className="cart-img">
                    <div className="empty"></div>
                </div>
                <div className="cardText">
                    <div className="info-text">
                        <div>
                            <h4>Gel de Massagem Corporal Lobisomem - 15 ml</h4>
                        </div>
                        <div className="description">
                            <p>Descrição um pouco mais detalhada do produto </p>
                        </div>
                        <div className="size-quantity">
                            <div>
                                <select name="size" id="size">
                                    <option value="unico">Tamanho único</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                </select>
                            </div>
                            <div className="itemQuantity">
                                <Button onClick={() => { lessQuantity() }} ><RemoveCircleIcon className="less" size={25} /></Button>
                                <p>{productQuantity}</p>
                                <Button onClick={() => { sumQuantity() }} ><AddCircleIcon size={25} /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="delete-price">
                        <div>
                            <MdDeleteForever className="delete" size={30} />
                        </div>
                        <div className="full-price">
                            <p>R$ 30,00</p>
                        </div>
                        <div className="discount-price">
                            <p>R$ 25,00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderEmpty"></div>
        </>
    );
}

export default CartCard;