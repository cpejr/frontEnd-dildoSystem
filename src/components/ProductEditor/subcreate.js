import React, { useState, useEffect } from 'react';

import './styles.css';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import ImageUpload from '../ImageUpload';
import api from '../../services/api';

export default function SubproductsCreate(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState(0);
  const [min_stock, setMinimum] = useState(0);
  const [image_id, setImageID] = useState();
  const [image, setImage] = useState();
  const [img_url, setImgURL] = useState();

  const [editar, setEditar] = useState();
  const [updated, setUpdated] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.wichOne === 'editar') {
      setEditar(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '') { data.append(key, value); }
    }

    addToData('name', name);
    addToData('description', description);
    addToData('stock_quantity', stock_quantity);
    addToData('min_stock', min_stock);
    addToData('visible', visible);
    addToData('imageFile', image);
    addToData('product_id', id);

    try {
      const response = await api.post('newSubproduct', data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      notification.open({
        message: 'Sucesso!',
        description:
          'Registro de subproduto concluída.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      }, response);
      setUpdated(!updated);
      window.location.reload();
    } catch (err) {
      if (!image) {
        notification.open({
          message: 'Erro!',
          description:
            'Imagem requerida.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
      } else {
        notification.open({
          message: 'Erro!',
          description:
            'Registro de subproduto impedida.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
      }
    }
  }

  function handleImage(img) {
    const img_url = URL.createObjectURL(img);
    setImgURL(img_url);
    setImage(img);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="subproduct-form">
        <p className="subproduct-form-title">Nome do subproduto</p>
        <input
          className="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          className="description"
          type="text"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="stock-form1">
          <div className="stock-form2">
            <p className="subproduct-form-title">Estoque</p>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroupPrepend2"
                  >
                    Unidades
                  </span>
                </div>
                <input
                  type="text"
                  value={stock_quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control"
                  id="validationDefaultUsername"
                  placeholder="0"
                  aria-describedby="inputGroupPrepend2"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroupPrepend2"
                  >
                    Mínimo
                  </span>
                </div>
                <input
                  type="text"
                  value={min_stock}
                  onChange={(e) => setMinimum(e.target.value)}
                  className="form-control"
                  id="validationDefaultUsername"
                  placeholder="0"
                  aria-describedby="inputGroupPrepend2"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="images-form">
          <p className="productTitle">Imagens</p>
          <label className="images-label" htmlFor="main">
            Principal
          </label>
          <div className="input-group mb-3">
            <ImageUpload onChange={handleImage} fileName="imageFile" url={img_url} />
          </div>
          <span className="images-label">
            Formatos aceitos: JPG, PNG
          </span>
        </div>
        <div className="sub-buttons">
          <button className="sub-create-button" type="submit">
            Criar subproduto
          </button>
        </div>
      </div>
    </form>
  );
}
