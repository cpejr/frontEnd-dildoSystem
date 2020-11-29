import React from 'react';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

let cart = {
    addItem(product, product_quantity) {
        let id_found = false;
        console.log('produtos sendo passados: ', product, product_quantity)
        let products = [];
        if (localStorage.getItem('cart')) {
            console.log("Tem carrinho");
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
            console.log(product.id === products[i].product.id)
            if (product.id === products[i].product.id) {
                id_found = true;
                console.log("Entrei")  //look for match with name
                products[i].quantity += product_quantity;
                let new_products = products.filter(product => product.product.id !== product.id);
                console.log("New Products: ", new_products);
                localStorage.setItem('cart', JSON.stringify(new_products));  //add two
                break;  //exit loop since you found the person
            }
        }
        if(!id_found){
            products.push({ 'product': product, 'quantity': product_quantity || 1 });
            localStorage.setItem('cart', JSON.stringify(products));
        }

    },
    deleteItem(productId) {
        let storageProducts = JSON.parse(localStorage.getItem('cart'));
        let products = storageProducts.filter(product => product.product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(products));
    },
};
export default cart;
// localStorage.setItem()
