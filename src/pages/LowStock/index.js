import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import CreateIcon from '@material-ui/icons/Create';
import '../../components/ProductEditor';
import api from '../../services/api';
import urlAWS from '../../services/imagesAWS';

import './styles.css';
import loading from '../../images/Loading.gif';

export default function Product(props) {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    api.get('lowStock', config).then((response) => {
      setLowStock(response.data.products);
    });
  }, [props.search, props.categoryId]);

  return (
    <div className="products-container-wrapper">
      <div className="products-container">
        {lowStock.map((product) => (
          <div className="Card">
            <Link to={`/product/${product.id}`} className="image-text-container">
              <ImageLoader
                src={`${urlAWS}/${product.image_id}`}
                loading={() => <img src={loading} alt="Loading..." />}
                error={() => <div>Error</div>}
              />
              <p id="titulo-card">
                {product.name}
              </p>
            </Link>

            <Link
              id="botao-editar"
              to={{
                pathname: `/admin/productedit/${product.id}`,
                state: product,
              }}
            >
              <span className="d-flex align-center justify-center">
                EDITAR
                <CreateIcon />
              </span>
            </Link>

          </div>
        ))}
      </div>
    </div>

  );
}
