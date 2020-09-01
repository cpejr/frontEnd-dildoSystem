import React, { useEffect, useState } from 'react';
import ImageLoader from 'react-loading-image';

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
    }
  }, [])

  function changeBigImage(event) {
    setBigImageIndex(event.target.parentNode.getAttribute('data-index'));
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
                <h2 className="title">Nome do produto</h2>
                <p className="description">Descrição detalhada do produto</p>

              </div>
            </div>
          </div>
        )}


    </div>
  );
}

export default ProductPage;