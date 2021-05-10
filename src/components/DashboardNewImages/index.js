import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import api from '../../services/api'
import urlAWS from '../../services/imagesAWS'

import './styles.css'

export default function FeaturedImages() {
  const [images, setImages] = useState([]);

  //const accessToken = localStorage.getItem('accessToken')

  // const config = {
  //   headers: { 'authorization': `Bearer ${accessToken}` },
  // }

  useEffect(() => {
    api.get('/banner').then(response => {
      setImages([...response.data])
    })
  }, [])


  return (
    <div className="featuredimages-wrapper">
      <Row className="ant-row-images">
        {
          images.map((img, index )=> (
            <Col span={12} className="col-images" key={index}>
              <div className="textbanner">
                <a href={img.link}>
                  <div className="text-banner-image">
                    <img alt="dashboard-images" src={`${urlAWS}/${img.image_id}`} ></img>
                  </div>
                </a>
              </div>
            </Col>

          ))
        }
      </Row>
    </div>
  )
}