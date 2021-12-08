import React, { useEffect, useState } from 'react';
import './style.css';
import {
  Row, Col, notification, Tabs,
} from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import CarouselImages from './CarouselImages';
import api from '../../services/api';
import ImageUpload from '../ImageUpload';
import BannerImages from './BannerImages.js';

const { TabPane } = Tabs;

const Carousel = function (props) {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [update, setUpdate] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const [bannerImages, setBannerImages] = useState([]);
  const [bannerNewImage, setBannerNewImage] = useState(null);
  const [linkBanner, setLinkBanner] = useState([]);

  useEffect(() => {
    api.get('Carousel', config).then((response) => {
      setImages(
        response.data.sort(
          ({ position: previousID }, { position: currentID }) => previousID - currentID,
        ),
      );
    });
    api.get('banner', config).then((response) => {
      setBannerImages(
        response.data.sort(
          ({ position: previousID }, { position: currentID }) => previousID - currentID,
        ),
      );
    });
  }, [update]);

  function handlePositionChange(id, pos) {
    const newarray = [...images];
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        newarray[i].position = parseInt(pos);
        setImages(newarray);
      }
    }
  }

  function handleLinkChange(id, link) {
    const newarray = [...images];
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        newarray[i].link = link;
        setImages(newarray);
      }
    }
  }

  function handlePositionChangeBanner(id, pos) {
    const newarray = [...bannerImages];
    for (let i = 0; i < bannerImages.length; i++) {
      if (bannerImages[i].id === id) {
        newarray[i].position = parseInt(pos);
        setBannerImages(newarray);
      }
    }
  }

  function handleLinkChangeBanner(id, link) {
    // setLinkBanner(link)
    const newarray = [...bannerImages];
    for (let j = 0; j < bannerImages.length; j++) {
      if (bannerImages[j].id === id) {
        bannerImages[j].link = link;
        setBannerImages(newarray);
      }
    }
  }

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  function handleImage(img) {
    setNewImage(img);
  }

  function handleBannerImage(img) {
    setBannerNewImage(img);
  }

  async function handleSubmit(e) {
    const data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '') data.append(key, value);
    }

    addToData('imageFile', newImage);

    if (newImage) {
      try {
        await api.post('newCarousel', data, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        setNewImage(undefined);
      } catch (err) {
        console.error(err.response);
        notification.open({
          message: 'Erro!',
          description: 'Erro ao registrar imagem.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
      }
    }

    try {
      await api.put(
        'Carousel',
        { info: images },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.accessToken}`,
          },
        },
      );
      setUpdate(!update);
      notification.open({
        message: 'Sucesso!',
        description: 'Atualizado com sucesso.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    } catch (err) {
      console.error(err.response);
      notification.open({
        message: 'Erro!',
        description: 'Erro ao editar posições.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  async function handleBannerSubmit(e) {
    const data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '') data.append(key, value);
    }

    addToData('imageFile', bannerNewImage);
    addToData('link', linkBanner);

    if (bannerNewImage) {
      try {
        await api.post('newBanner', data, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        setBannerNewImage(undefined);
      } catch (err) {
        notification.open({
          message: 'Erro!',
          description: 'Erro ao registrar imagem.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
          style: {
            width: 600,
          },
        });
      }
    }

    try {
      const response = await api.put(
        'banner',
        { info: bannerImages },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.accessToken}`,
          },
        },
      );
      setUpdate(!update);
      notification.open(
        {
          message: 'Sucesso!',
          description: 'Atualizado com sucesso.',
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
        description: 'Erro ao editar posições.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#F9CE56' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  return (
    <Tabs type="card">
      <TabPane tab="Carrosel" key="1">
        <div className="EditCarousel-Container">
          {images.map((image, index) => (
            <CarouselImages
              key={`image-${index}`}
              image={image}
              Update={update}
              setUpdate={setUpdate}
              handlePositionChange={handlePositionChange}
              handleLinkChange={handleLinkChange}
            />
          ))}

          <h4>Enviar Nova Imagem</h4>

          <div className="carousel-image-form">
            <div className="input-group mb-3">
              <ImageUpload onChange={handleImage} fileName="imageFile" />
            </div>
          </div>
          <div className="enviar-button-carousel">
            <button className="edit-save" onClick={handleSubmit}>
              Enviar Alterações
            </button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Banner" key="2">
        <div className="banner-container">
          <div className="divider-banner-sup">
            <Row className="ant-row-images">
              {bannerImages.map((image, i) => (
                <Col span={8} className="col-images">
                  <div className="textbanner">
                    <div className="text-banner-image">
                      {/* <img src={`https://docs.google.com/uc?id=${img.image_id}`} ></img> */}
                      <BannerImages
                        key={`image-${i}`}
                        image={image}
                        update={update}
                        setUpdate={setUpdate}
                        handlePositionChangeBanner={handlePositionChangeBanner}
                        handleLinkChangeBanner={handleLinkChangeBanner}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <span>OBS: o campo de "link" não pode ficar vazio.</span>
          <div className="divider-banner-inf">
            <h4>Enviar Nova Imagem</h4>

            <div className="carousel-image-form">
              <div className="input-group mb-3">
                <ImageUpload
                  onChange={handleBannerImage}
                  fileName="BannerImageFile"
                />
              </div>
            </div>
            <div className="enviar-button-carousel">
              <button className="edit-save" onClick={handleBannerSubmit}>
                Enviar Alterações
              </button>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default Carousel;
