import React, { useState, useEffect } from 'react';

import './styles.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ImageLoader from 'react-loading-image';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import MultipleUploader from '../MultipleUploader';
import loading from '../../images/Loading.gif';
import ImageUpload from '../ImageUpload';
import api from '../../services/api';
import urlAWS from '../../services/imagesAWS';

export default function SubproductsEdit({ subproduto }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState(0);
  const [min_stock, setMinimum] = useState(0);
  const [image_id, setImageID] = useState();
  const [image, setImage] = useState();
  const [updated, setUpdated] = useState(false);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [img_url, setImgURL] = useState();

  const [editar, setEditar] = useState('editar');

  const accessToken = localStorage.getItem('accessToken');

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get(`images/${subproduto.id}`).then((response) => {
      setImages(response.data);
    });
  }, [updated]);

  useEffect(() => {
    if (subproduto !== undefined) {
      setName(subproduto.name);
      setDescription(subproduto.description);
      setVisible(Boolean(subproduto.visible));
      setQuantity(subproduto.stock_quantity);
      setMinimum(subproduto.min_stock);
    }
  }, [subproduto]);

  useEffect(() => {
    if (subproduto.wichOne === 'editar') {
      setEditar(true);
    }
  }, []);

  const handleDeleteSubproduct = () => {
    api.delete(`subproducts/${subproduto.id}`, config).then((response) => {});
    window.location.reload();
  };

  async function handleSubSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '') data.append(key, value);
    }

    addToData('name', name);
    addToData('description', description);
    addToData('stock_quantity', stock_quantity);
    addToData('min_stock', min_stock);
    addToData('visible', visible);
    addToData('imageFile', image_id);

    try {
      const response = await api.put(
        `updateSubproduct/${subproduto.id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.accessToken}`,
          },
        },
      );
      notification.open(
        {
          message: 'Sucesso!',
          description: 'Edição de subproduto concluída.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        },
        response,
      );
    } catch (err) {
      console.error(err.response);
      notification.open({
        message: 'Erro!',
        description: 'Edição do subproduto impedida.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  function handleImage(img) {
    const img_url = URL.createObjectURL(img);
    setImgURL(img_url);
    setImage(img);
  }

  const handleDeleteSecImage = (image) => {
    try {
      const response = api
        .delete(`image/${image}`, config)
        .then((response) => {});
      notification.open(
        {
          message: 'Sucesso!',
          description: 'Imagem secundária deletada.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        },
        response,
      );
    } catch (err) {
      console.error(err.response);
      notification.open({
        message: 'Erro!',
        description: 'Não foi possível excluir a imagem.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
    setUpdated(!updated);
  };

  return (
    <form onSubmit={handleSubSubmit}>
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
                  <span className="input-group-text" id="inputGroupPrepend2">
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
                  <span className="input-group-text" id="inputGroupPrepend2">
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
          <ImageLoader
            className="image-loader-sub"
            src={`${urlAWS}/${subproduto.image_id}`}
            loading={() => <img src={loading} alt="Loading..." />}
            error={() => <div>Error</div>}
          />
          <br />
          <label className="images-label" htmlFor="main">
            Principal
          </label>
          <div className="input-group mb-3">
            <ImageUpload
              onChange={handleImage}
              fileName="imageFile"
              url={img_url}
            />
          </div>
          <label className="images-label" htmlFor="secondary">
            Secudárias
          </label>
          <div className="pres-sub-imgs">
            {images.map((image, index) => (
              <div className="secimage-comp-loader-sub">
                <DeleteForeverIcon
                  className="edit-delete-secimage"
                  type="button"
                  onClick={() => handleDeleteSecImage(image.id)}
                />
                <ImageLoader
                  className="secimage-loader-sub"
                  src={`${urlAWS}/${image.id}`}
                  loading={() => <img src={loading} alt="Loading..." />}
                  error={() => <div>Error</div>}
                />
              </div>
            ))}
          </div>
          <MultipleUploader
            canSubmit
            canDelete
            subproductId={subproduto.id}
            productId={id}
          />
          <div className="input-group mb-3">
            <label
              className="file-label"
              htmlFor="inputGroupFile01"
              htmlFor="fileName"
            />
          </div>
          <span className="images-label">Formatos aceitos: JPG, PNG</span>
        </div>
        <div className="sub-buttons">
          <button
            className="sub-del-button"
            onClick={(e) => handleDeleteSubproduct()}
          >
            Excluir Subproduto
          </button>
          <button className="sub-edit-button" type="submit">
            Enviar Alterações
          </button>
        </div>
      </div>
    </form>
  );
}
