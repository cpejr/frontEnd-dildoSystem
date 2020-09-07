import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import loading from '../../images/Loading.gif';

import { LoginContext } from '../../Contexts/LoginContext';
import Header from '../../components/Header';
import api from '../../services/api';

//this.props.match.params.id

function ProductPage(props) {

  const [productData, setProductData] = useState();
  const [images, setImages] = useState([]);
  const [bigImageIndex, setBigImageIndex] = useState(0);

  const [onSale, setOnSale] = useState();
  const [price, setPrice] = useState(false);
  const [onSalePrice, setOnSalePrice] = useState();

  const [selectedSubpIndex, setSelectedSubpIndex] = useState(0);
  const [relevantStock, setRelevantStock] = useState();
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');

  const user = useContext(LoginContext);
  const history = useHistory();

  const accessToken = localStorage.getItem('accessToken');

  const config = {
    headers: { authorization: `Bearer ${accessToken}` }
  }

  useEffect(() => {

    const url = `product/${props.match.params.id}`;
    if (accessToken) {
      api.get(url, config).then(response => {
        setProductData(response.data)
        setImages([...images,
        `https://docs.google.com/uc?id=${response.data.image_id}`,
          `https://picsum.photos/id/1018/1000/600/`,
          `https://picsum.photos/id/1015/1000/600/`,
        ]);
        console.log(response.data)
      });
    } else {
      api.get(url).then(response => {
        setProductData(response.data)
        setImages([...images,
        `https://docs.google.com/uc?id=${response.data.image_id}`,
          `https://picsum.photos/id/1018/1000/600/`,
          `https://picsum.photos/id/1015/1000/600/`,
        ]);
        if(response.data.subproducts.length > 0) {
          setRelevantStock(response.data.subproducts[0].stock_quantity);
        } else {
          setRelevantStock(response.data.stock_quantity);
        }
        console.log(response.data)
      });
    }
  }, [])

  useEffect(() => {
    if (productData) {
      const price = (user.type === 'wholesaler' ? productData.wholesaler_price : productData.client_price);
      let salePrice;
      let onSale = false;
      if (productData.on_sale_wholesaler && user.type === 'wholesaler') {
        salePrice = productData.wholesaler_sale_price;
        onSale = true;
      } else if (productData.on_sale_client && user.type === 'retailer') {
        salePrice = productData.client_sale_price;
        onSale = true;
      }

      setPrice(price);
      setOnSale(onSale);
      setOnSalePrice(salePrice);
    }
  }, [productData]);


  function changeBigImage(event) {
    setBigImageIndex(event.target.parentNode.getAttribute('data-index'));
  }

  function selectSubproduct(event) {
    const newIndex = Number(event.target.getAttribute('data'));
    setSelectedSubpIndex(newIndex);
    setRelevantStock(productData.subproducts[newIndex].stock_quantity);
    setQuantity(1);
  }

  function incrementQuantity() {
    if (quantity < relevantStock)
      setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    if (quantity > 1)
      setQuantity(quantity - 1);
  }

  function handleCepChange(event) {
    const accepted = ['0','1','2','3','4','5','6','7','8','9', '-'];
    
    const indexOfChar = accepted.indexOf(event.target.value.slice(-1));
    console.log(event.target.value)
    if(event.target.value!='' && (indexOfChar < 0 || (indexOfChar==10 && event.target.value.length != 5 && event.target.value.length != 6))) {
      console.log(event.target.value.length)
      setCep(cep);
      return;
    }

    let newCep = event.target.value;

    if(newCep.length === 5 && cep.length===4) {
      newCep += '-';
    }

    setCep(newCep);
    
  }

  return (
    <div className="full-page-wrapper">
      <Header />
      {(!productData) && <img src={loading} />}
      {(productData) &&
        (
          <div className="product-page-wrapper">
            <div className="product-page-container">
              <div className="photos-column">
                <div className="go-back-btn" onClick={()=>{history.goBack()}}>
                  <FiArrowLeft className="icon" /> Voltar
                </div>
                <div className="img-container">
                  <ImageLoader
                    src={images[bigImageIndex]}
                    loading={() => <img src={loading} alt="Loading..." />}
                    error={() => <div>Error</div>}
                  />
                </div>
                <div className="thumbnails">
                  {images.map((imgSrc, index) => {
                    return (
                      <div onClick={changeBigImage} data-index={index} >
                        <ImageLoader
                          src={imgSrc}
                          loading={() => <img src={loading} alt="Loading..." />}
                          error={() => <div>Error</div>}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="info-column">
                <h2 className="title">{productData.name}</h2>
                <p className="description">{productData.description}</p>

                <div className="divider-line" />

                <div className="prices">
                  <h2 className={`main-price ${onSale && 'sale'}`}>{`R$ ${Number(price).toFixed(2)}`}</h2>
                  {onSale && <h2 className="sale-price">{`R$ ${Number(onSalePrice).toFixed(2)}`}</h2>}
                </div>

                <div className="divider-line" />
                <div className="options">

                  <div className="subproduct-options">
                    <div className="option-selector">
                      <p>Opção: </p>
                      {productData.subproducts.length > 0
                        ? productData.subproducts.map((subp, index) => {
                          return (
                            <img
                              src={`https://docs.google.com/uc?id=${subp.image_id} `}
                              key={`option-${index + 1}`}
                              data={index}
                              className={index === selectedSubpIndex && 'selected'}
                              onClick={selectSubproduct}
                            />
                          )
                        })
                        : <p> Única</p>}
                    </div>
                    {productData.subproducts.length > 0 &&
                      <div className="chosen-option">
                        <p style={{ "font-weight": "bold" }}>{'Selecionado:'} </p>
                        <p> {productData.subproducts[selectedSubpIndex].name}</p>
                      </div>
                    }
                  </div>

                  <div className="quantity-options">
                    <FaMinusCircle className={"quantity-changer " + (quantity <= 1 && 'locked')} onClick={decrementQuantity} />
                    <p className="quantity-indicator">{quantity}</p>
                    <FaPlusCircle className={"quantity-changer " + (quantity >= relevantStock && "locked")} onClick={incrementQuantity} />
                  </div>
                </div>
                {(relevantStock > 0 
                  ?(<button className="buy-button" onClick={()=>{console.log('Add to cart')}}>COMPRAR</button>)
                  :(<div className="unavailable">Produto indisponível</div>)
                  )}
                
                <div className="shipping">
                  <input type="text" placeholder="Digite seu CEP" value={cep} onChange={handleCepChange} min="0" maxlength="9"/>
                  <button>CALCULAR FRETE</button>
                </div>
                
              </div>
            </div>
          </div>
        )}


    </div>
  );
}

export default ProductPage;