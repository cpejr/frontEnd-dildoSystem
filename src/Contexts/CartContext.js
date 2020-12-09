import React, { useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export const CartContext = React.createContext();

export function useCart() {
    return useContext(CartContext);
}

function CartContextProvider({ children }) {
    const [localCart, setLocalCart] = useState();
    const [totalQuantity, setTotalQuantity] = useState(0);

    // useEffect(() => {
    //     if (localStorage.getItem('cart')) {
    //         JSON.parse(localStorage.getItem('cart')).then(res => {setLocalCart(res)});
    //     }

    //     return () => {
    //         if (localCart) {
    //             JSON.stringify(localCart).then(res => localStorage.setItem('cart', res))
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     if (localCart) {
    //         const accessToken = localStorage.getItem('accessToken');

    //         const config = {
    //             headers: { 'authorization': `Bearer ${accessToken}` },
    //             body: JSON.parse(localCart)
    //         }
    //         if (accessToken) {
    //             api.post("cart", config)
    //         }

    //         const sum = localCart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity);
    //         setTotalQuantity(sum);
    //     }

    // }, [localCart]);

    function addItem(product, product_quantity, subproduct_id) {
        // let id_found = false;
        // let products = [];
        // if (localCart) {
        //     products = localCart;
        //     notification.open({
        //         message: 'Sucesso!',
        //         description:
        //             'O produto foi adicionado ao carrinho.',
        //         className: 'ant-notification',
        //         top: '100px',
        //         icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
        //         style: {
        //             width: 600,
        //         },
        //     });
        // }
        // for (var i = 0; i < products.length; i++) {
        //     if (product.id === products[i].product_id && subproduct_id && subproduct_id === products[i].subproduct_id) {
        //         id_found = true;
        //         products[i].quantity += product_quantity;
        //         let new_products = products.filter(product => product.subproduct_id == subproduct_id);
        //         setLocalCart(new_products);
        //         break;
        //     }
        //     if (!subproduct_id && product.id === products[i].product_id) {
        //         id_found = true;
        //         products[i].quantity += product_quantity;
        //         let new_products = products.filter(product => product.product_id !== product.id);
        //         setLocalCart(new_products);
        //         break;
        //     }
        // }
        // if (!id_found) {
        //     products.push({ 'product_id': product.id, 'quantity': product_quantity || 1, 'subproduct_id': subproduct_id });
        //     setLocalCart(products);
        // }

        let id_found = false;
        let products = [];
        if (localStorage.getItem('cart')) {
            products = JSON.parse(localStorage.getItem('cart'));
            notification.open({
                message: 'Sucesso!',
                description:
                    'O produto foi adicionado ao carrinho.',
                className: 'ant-notification',
                top: '100px',
                icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
                style: {
                    width: 600,
                },
            });
        }
        for (var i = 0; i < products.length; i++) {
            if (product.id === products[i].product_id && subproduct_id && subproduct_id === products[i].subproduct_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                let new_products = products.filter(product => product.subproduct_id == subproduct_id);
                localStorage.setItem('cart', JSON.stringify(new_products));
                break;
            }
            if (!subproduct_id && product.id === products[i].product_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                let new_products = products.filter(product => product.product_id !== product.id);
                localStorage.setItem('cart', JSON.stringify(new_products));
                break;
            }
        }
        if (!id_found) {
            products.push({ 'product_id': product.id, 'quantity': product_quantity || 1, 'subproduct_id': subproduct_id });
            localStorage.setItem('cart', JSON.stringify(products));
        }
    }

    function deleteItem(productId) {
        // if (localCart) {
        //     let storageProducts = localCart;
        //     let products = storageProducts.filter(product => product.product_id !== productId);
        //     setLocalCart(products);
        // }

        let storageProducts = JSON.parse(localStorage.getItem('cart'));
        let products = storageProducts.filter(product => product.product_id !== productId);
        localStorage.setItem('cart', JSON.stringify(products));

    }

    function clear() {
        setLocalCart();
    }

    function changeQuantity(product_id, subproduct_id, quantity) {
        let cart = [...localCart];
        let index = cart.findIndex(element => (element.id === product_id) && ((element.subproduct.id === subproduct_id) || (!element.subproduct.id)));
        cart[index].quantity = quantity;
        setLocalCart(cart);
    }

    return (
        <CartContext.Provider value={{ cart: localCart, addItem, deleteItem, clear, totalQuantity, changeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;