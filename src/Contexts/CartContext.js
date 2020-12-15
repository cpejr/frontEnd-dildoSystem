import React, { useContext, useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export const CartContext = React.createContext();

export function useCart() {
    return useContext(CartContext);
}

function CartContextProvider({ children }) {
    const [localCart, setLocalCart] = useState();
    const [minCart, setMinCart] = useState();
    const [stringifiedMinCart, setStringifiedMinCart] = useState();
    const [totalQuantity, setTotalQuantity] = useState(0);

    const [update, setUpdate] = useState(false);

    const productsChanged = useRef(true);



    function updateLocalStorage() {
        if (minCart) {
            localStorage.setItem('cart', stringifiedMinCart);
        } else {
            localStorage.removeItem('cart');
        }
    }

    useEffect(() => { // PUXA CARRINHO DO LOCALSTORAGE INICIALMENTE E SETA MINIFICADO
        if (localStorage.getItem('cart')) {
            const newStringifiedMinCart = localStorage.getItem('cart');
            const newMinCart = JSON.parse(newStringifiedMinCart);
            setMinCart(newMinCart);
            setUpdate(!update);
            setStringifiedMinCart(newStringifiedMinCart);
        }

        return updateLocalStorage;
    }, []);

    window.onbeforeunload = updateLocalStorage;

    useEffect(() => { // TODA VEZ QUE MINIFICADO MUDA, PUXA CARRINHO ESTRUTURADO DO BACK

        async function grabCartFromBack() {
            const accessToken = localStorage.getItem('accessToken');

            const config = {
                headers: { 'authorization': `Bearer ${accessToken}` },
            }
            if (accessToken) {
                try {
                    let newCart = await api.post("cart", minCart, config);
                    newCart = newCart.data;
                    setLocalCart(newCart);
                } catch (error) {
                    console.log(error)
                }
            }
        }
        if (minCart) {
            if (productsChanged.current) {
                grabCartFromBack();
                productsChanged.current = false;
            } else {
                let newLocalCart = [...localCart];
                minCart.forEach((prod, index) => {
                    newLocalCart[index].quantity = prod.quantity;
                });
                setLocalCart(newLocalCart);
            }
            const newStringifiedMinCart = JSON.stringify(minCart);
            const sum = minCart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

            setTotalQuantity(sum);
            setStringifiedMinCart(newStringifiedMinCart);
        } else {
            setLocalCart(undefined);
            setStringifiedMinCart(undefined);
            setTotalQuantity(0);
        }

    }, [minCart, update]);

    function addItem(product_id, product_quantity, subproduct_id) {
        let id_found = false;
        let products = [];
        productsChanged.current = true;
        if (minCart) {
            products = minCart;
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
            if (product_id === products[i].product_id && subproduct_id && subproduct_id === products[i].subproduct_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                setMinCart(products);
                setUpdate(!update);
                break;
            }
            if (!subproduct_id && product_id === products[i].product_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                setMinCart(products);
                setUpdate(!update);
                break;
            }
        }
        if (!id_found) {
            products.push({ 'product_id': product_id, 'quantity': product_quantity || 1, 'subproduct_id': subproduct_id });
            setMinCart(products);
            setUpdate(!update);
        }
    }

    function deleteItem(product_id, subproduct_id) {
        if (minCart) {
            let storageProducts = minCart;
            let products = storageProducts.filter(product => (product.product_id !== product_id && (!subproduct_id || product.subproduct_id !== subproduct_id)));
            productsChanged.current = true;
            setMinCart(products);
            setUpdate(!update);
        }
    }

    function clear() {
        productsChanged.current = true;
        setMinCart(undefined);
        setStringifiedMinCart(undefined);
        setLocalCart(undefined);
        setUpdate(!update);
    }

    function changeQuantity(product_id, subproduct_id, quantity) {
        let cart = [...minCart];
        let index = cart.findIndex(element => (element.product_id === product_id) && ((!element.subproduct_id) || (element.subproduct_id === subproduct_id)));
        if (quantity > 0) {
            cart[index].quantity = quantity;
        } else {
            cart.splice(index, 1);
            productsChanged.current = true;
        }
        setMinCart(cart);
        setUpdate(!update);
    }

    return (
        <CartContext.Provider value={{ cart: localCart, addItem, deleteItem, clear, totalQuantity, changeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;