import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ImageLoader from 'react-loading-image';
import loading from '../../images/Loading.gif';
import { Link } from 'react-router-dom';

import './styles.css';
import { Button } from '@material-ui/core';
import { useCart } from '../../Contexts/CartContext';

import urlAWS from '../../services/imagesAWS';

const CartCard = function (props) {
  const [productQuantity, setProductQuantity] = useState(
    props.product.quantity,
  );
  const [isVisible, setIsVisible] = useState(true);
  const { product } = props;
  const { quantity } = props.product;
  const { onChangePrice } = props;
  const { onDeleteProduct } = props;
  const { deleteItem, changeQuantity, getProductPrice } = useCart();
  const [relevantStock] = useState(
    props.product.subproduct
      ? props.product.subproduct.stock_quantity
      : props.product.stock_quantity,
  );

  const setNewPrice = () => {
    let product_price;
    if (product.wholesaler_price) {
      if (product.on_sale_wholesaler) {
        product_price = product.wholesaler_sale_price.toFixed(2);
      } else {
        product_price = product.wholesaler_price.toFixed(2);
      }
    } else if (product.on_sale_client) {
      product_price = product.client_sale_price.toFixed(2);
    } else {
      product_price = product.client_price.toFixed(2);
    }
    return product_price;
  };

  useEffect(() => {
    const price = getProductPrice(product);
  }, []);

  function addOne() {
    if (props.product.quantity + 1 <= relevantStock) {
      const subpId = props.product.subproduct
        ? props.product.subproduct.id
        : undefined;
      changeQuantity(props.product.id, subpId, props.product.quantity + 1);
    } else {
      document.getElementsByClassName(
        `more-${props.productId}`,
      )[0].style.color = ' #d3cece';
    }
  }

  function removeOne() {
    const subpId = props.product.subproduct
      ? props.product.subproduct.id
      : undefined;
    changeQuantity(props.product.id, subpId, props.product.quantity - 1);
  }

  return (
    <>
      {isVisible ? (
        <>
          <div className="cart-card">
            <div className="cart-img">
              <Link
                to={`/product/${props.productId}`}
                className="image-text-container"
              >
                <ImageLoader
                  src={`${urlAWS}/${props.image_id}`}
                  loading={() => <img src={loading} alt="Loading..." />}
                  error={() => <div>Error</div>}
                />
              </Link>
            </div>
            <div className="cardText">
              <div className="info-text">
                <div>
                  <h4>{props.name}</h4>
                </div>
                <div>
                  {props.product.subproduct ? (
                    <div className="subproduct-cart-wrapper">
                      <p>
                        Opção:
                        {props.product.subproduct.name}
                      </p>
                      <img
                        alt="subproduct"
                        src={`${urlAWS}/${props.product.subproduct.image_id} `}
                        className="subproduct-image-cart"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="size-quantity">
                  <div className="itemQuantity">
                    <Button
                      onClick={() => {
                        removeOne();
                      }}
                    >
                      <RemoveCircleIcon
                        className={`less-${props.productId}`}
                        size={25}
                      />
                    </Button>
                    <p>{props.product.quantity}</p>
                    <Button
                      disabled={!(props.product.quantity + 1 <= relevantStock)}
                      onClick={() => {
                        addOne();
                      }}
                    >
                      <AddCircleIcon
                        className={`more-${props.productId}`}
                        size={25}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="delete-price">
                <div>
                  <MdDeleteForever
                    className="delete"
                    size={30}
                    onClick={(e) => {
                      deleteItem(
                        props.productId,
                        props.product.subproduct
                          ? props.product.subproduct.id
                          : undefined,
                      ); /* setIsVisible(false); onDeleteProduct({ productId: product.id }); */
                    }}
                  />
                </div>

                <PriceElement
                  product={props.product}
                  product_quantity={props.product.quantity}
                />
              </div>
            </div>
          </div>

          <div className="borderEmpty" />
        </>
      ) : (
        <div />
      )}
    </>
  );

  const PriceElement = function (props) {
    const { product } = props;
    const { product_quantity } = props;

    const { regularPrice, discountedPrice } = getProductPrice(product);

    if (discountedPrice) {
      return (
        <div className="price-container">
          <p className="preco-card cortado">
            {`R$ ${Number(
              regularPrice * product_quantity,
            ).toFixed(2)}`}
          </p>

          <p className="preco-promocao">
            {`R$ ${Number(discountedPrice * product_quantity).toFixed(2)}`}
          </p>
        </div>
      );
    }
    return (
      <div className="price-container">
        <span className="preco-card">
          {`R$ ${Number(
            regularPrice * product_quantity,
          ).toFixed(2)}`}
        </span>
      </div>
    );
  };
};

export default CartCard;
