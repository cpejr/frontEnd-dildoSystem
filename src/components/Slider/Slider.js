import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./styles.css";
import api from "../../services/api";

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const [images, setImages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("Carousel", config).then((response) => {
      setImages([...response.data]);
    });
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="Carousel">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((image, index) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://docs.google.com/uc?id=${image.image_id}`}
                alt={image}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
