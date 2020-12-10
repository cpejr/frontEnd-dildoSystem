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

    /* const [count, setCount] = useState(0);

    useEffect(() => {

        let newC = localStorage.getItem("count");
        console.log('Effect')
        if (newC) { console.log('ACHOU'); newC = Number(newC) + 1; } else { newC = 1 };
        console.log('counter', newC);
        setCount(newC);

        return (updateLocalStorage);
    }, [])

    function updateLocalStorage() {
        localStorage.setItem("count", count);
    }

    window.onbeforeunload = () => {
        localStorage.setItem("count", count);
    } */

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
        //console.log('Effect de atualização rolando');
        console.log(minCart);
        async function grabCartFromBack() {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            //const newStringifiedMinCart = JSON.stringify(minCart);

            const config = {
                headers: { 'authorization': `Bearer ${accessToken}` },
            }
            if (accessToken) {
                try {
                    let newCart = await api.post("cart", minCart, config);
                    newCart = newCart.data;

                    //const sum = newCart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

                    //setTotalQuantity(sum);
                    setLocalCart(newCart);
                } catch (error) {
                    console.log(error)
                }

                //setStringifiedMinCart(newStringifiedMinCart);
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
                //let new_products = products.filter(product => product.subproduct_id == subproduct_id);
                setMinCart(products);
                setUpdate(!update);
                break;
            }
            if (!subproduct_id && product_id === products[i].product_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                //let new_products = products.filter(product => product.product_id !== product.id);
                setMinCart(products);
                setUpdate(!update);
                break;
            }
        }
        if (!id_found) {
            products.push({ 'product_id': product_id, 'quantity': product_quantity || 1, 'subproduct_id': subproduct_id });
            console.log('novo array minificado', products);
            setMinCart(products);
            setUpdate(!update);
        }

        /*  let id_found = false;
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
         } */
    }

    function deleteItem(product_id, subproduct_id) {
        if (minCart) {
            let storageProducts = minCart;
            let products = storageProducts.filter(product => (product.product_id !== product_id && (!subproduct_id || product.subproduct_id !== subproduct_id)));
            productsChanged.current = true;
            setMinCart(products);
            setUpdate(!update);
        }

        /*  let storageProducts = JSON.parse(localStorage.getItem('cart'));
         let products = storageProducts.filter(product => product.product_id !== productId);
         localStorage.setItem('cart', JSON.stringify(products)); */

    }

    function clear() {
        productsChanged.current = true;
        console.log('Limpando');
        setMinCart(undefined);
        setStringifiedMinCart(undefined);
        setLocalCart(undefined);
        setUpdate(!update);
    }

    function changeQuantity(product_id, subproduct_id, quantity) {
        let cart = [...minCart];
        let index = cart.findIndex(element => (element.product_id === product_id) && ((!element.subproduct_id) || (element.subproduct_id === subproduct_id)));
        console.log(product_id, subproduct_id, quantity, index);
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