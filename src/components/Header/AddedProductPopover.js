import React, { useState, useEffect } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCart } from '../../Contexts/CartContext';
import api from '../../services/api';

function AddedProductPopover({ target }) {
  const { lastAddedProduct, setLastAddedProduct, deleteItem } = useCart();

  const [product, setProduct] = useState();
  const [show, setShow] = useState(false);

  function getPrice(product) {
    if (product.wholesaler_price) {
      if (product.on_sale_wholesaler) {
        return (

          `R$ ${Number(product.wholesaler_sale_price).toFixed(2)}`

        )
      } else {
        return (
          `R$ ${Number(product.wholesaler_price).toFixed(2)}`
        )

      }
    } else {
      if (product.on_sale_client) {
        return (
          `R$ ${Number(product.client_sale_price).toFixed(2)}`
        )
      } else {
        return (
          `R$ ${Number(product.client_price).toFixed(2)}`
        )
      }
    }
  }

  useEffect(() => {
    if (lastAddedProduct) {

      const accessToken = localStorage.getItem("accessToken");

      const config = { headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` } }

      api.get(`/product/${lastAddedProduct.product_id}`, accessToken && config)
        .then(response => {
          console.log(response);
          setProduct({
            name: response.data.name,
            productQuantity: lastAddedProduct.product_quantity,
            price: getPrice(response.data),
            product_id: lastAddedProduct.product_id,
            subproduct_id: lastAddedProduct.subproduct_id || undefined
          });
          setShow(true);
        })
    } else {
      setProduct();
      setShow(false);
    }
  }, [lastAddedProduct]);

  return (
    (product && window.innerWidth > 1000 && show) ? (<Overlay
      show={true}
      target={target}
      placement="bottom"
    /* style={{
      backgroundColor: "var(--mainColor)"
    }} */
    >
      <Popover className="popover" arrowProps={{ className: "popover" }}>
        <div className="cart-popover-wrapper">
          <h6><FaCheck /> Colocado no carrinho</h6>
          <h5>{product.name}</h5>

          <div className="price-and-remove-line">
            <p>{product.price} | QNT: ${product.productQuantity}</p>
            <button onClick={() => { deleteItem(product.product_id, product.subproduct_id ? product.subproduct_id : undefined); setShow(false) }}>Remover</button>
          </div>

          <hr />
          <br />

          <div className="subtotal-balao">
            <p>Subtotal</p>
            <p>{product.price}</p>
          </div>

          <div className="buttons-line">
            <Link to='/cart'>
              <button className="to-cart" onClick={() => { setShow(false); setLastAddedProduct(undefined) }}>Olhar carrinho</button>
            </Link>
            <Link to='/addresses'>
              <button className='to-addresses' onClick={() => { setShow(false); setLastAddedProduct(undefined) }}>Pagar</button>
            </Link>
          </div>
        </div>


      </Popover>
    </Overlay>) : <div style={{ display: 'none' }}></div>
  );
}

export default AddedProductPopover; 