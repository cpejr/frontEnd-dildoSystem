import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

import { PriceElement } from './NewProductCard';
import cart from '../../services/cart';
import { useCart } from '../../Contexts/CartContext';
import urlAWS from '../../services/imagesAWS';

import './styles.css';

export default function ProductModal({ product, visible, onCancel }) {
  const [quantity, setQuantity] = useState(1);
  const [relevantStock, setRelevantStock] = useState();
  const [selectedSubpIndex, setSelectedSubpIndex] = useState(0);

  const childrenRef = React.createRef();
  const [modalWidth, setModalWidth] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (!product.subproducts || product.subproducts.length === 0) {
      setRelevantStock(product.stock_quantity);
    } else {
      selectSubproduct({ target: { value: 0 } });
    }
  }, [product]);

  useEffect(() => {
    if (childrenRef.current && visible && firstTime) {
      setModalSize();
      setFirstTime(false);
    }
  }, [childrenRef.current, visible]);

  function setModalSize() {
    const newWidth = childrenRef.current.scrollWidth;
    setModalWidth(newWidth);
  }

  function selectSubproduct(event) {
    const newIndex = event.target.value;
    setSelectedSubpIndex(newIndex);
    setRelevantStock(product.subproducts[newIndex].stock_quantity);
    setQuantity(1);
  }

  function incrementQuantity() {
    if (quantity < relevantStock) setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      title={product.name}
      width={Math.min(modalWidth + 48, window.innerWidth)}
    // destroyOnClose={true}
    >
      <div className="product-modal-wrapper" ref={childrenRef}>
        <img className="product-modal-image" src={`${urlAWS}/${product.image_id}`} alt={product.name} onLoad={setModalSize} />
        <div className="buying-configs">
          <div className="subproduct-selection">
            <p>Opção: </p>
            {
              product.subproducts ? (
                <select value={selectedSubpIndex} onChange={selectSubproduct}>
                  {product.subproducts.map((subp, index) => (
                    <option disabled={subp.stock_quantity === 0} value={index} key={index}>{subp.name}</option>
                  ))}
                </select>
              ) : (<p>Única</p>)
            }
          </div>
          <div className="quantity-options">
            <p>Quantidade: </p>
            <FaMinusCircle className={`quantity-changer ${quantity <= 1 && 'locked'}`} onClick={decrementQuantity} />
            <p className="quantity-indicator">{quantity}</p>
            <FaPlusCircle className={`quantity-changer ${quantity >= relevantStock && 'locked'}`} onClick={incrementQuantity} />
          </div>
          <p>Preço unitário:</p>
          <PriceElement product={product} />
          <br />
          <button className="buy-button" onClick={() => { addItem(product.id, quantity, (product.subproducts && product.subproducts.length > 0) ? product.subproducts[selectedSubpIndex].id : undefined, true); onCancel(); }}>COMPRAR</button>

        </div>
      </div>

    </Modal>
  );
}
