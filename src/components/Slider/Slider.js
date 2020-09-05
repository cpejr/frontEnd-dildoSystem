import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel'
import './styles.css';

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="Carousel">
     <Carousel activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require('../../images/1.jpg')}
        alt="First slide"
      />
      <Carousel.Caption>

      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require('../../images/2.jpg')}
        alt="Second slide"
      />

      <Carousel.Caption>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require('../../images/3.jpg')}
        alt="Third slide"
      />

      <Carousel.Caption>

      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  );
  
}
