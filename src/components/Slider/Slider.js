import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./styles.css";
import api from "../../services/api";
import nextIcon from "../../images/nextIcon.png";
import prevIcon from "../../images/prevIcon.png";

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
      <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={<span aria-hidden="true" className="" > <img src={nextIcon}/></span>} prevIcon={<span aria-hidden="true" className="" ><img src={prevIcon}/></span>}>
        {images.map((image, index) => {
          let prev, next;
          if (index == 0) {
            prev = images.length - 1
            next = index + 1
            console.log(images[prev]);
          } else if (index == images.length - 1) {
            prev = index - 1;
            next = 0
          } else {
            prev = index - 1;
            next = index + 1;
          };
          return (
            <Carousel.Item>
              <div className="CarouselImages">
                <div className="previmage">
                  <img

                    src={`https://docs.google.com/uc?id=${images[prev].image_id}`}

                  />
                </div>
                <a href={image.link}>
                  <img
                    className="d-block w-100"
                    src={`https://docs.google.com/uc?id=${image.image_id}`}
                    alt={image}
                  />
                </a>
                <div className="nextimage">
                  <img

                    src={`https://docs.google.com/uc?id=${images[next].image_id}`}

                  />
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
