import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselStyle.css";

import NewProductCard from "../ProductCard/NewProductCard";
import api from "../../services/api";

import nextIcon from "../../images/nextIcon.png";
import prevIcon from "../../images/prevIcon.png";

export default function CarouselProducts() {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [numberElements, setNumberElements] = useState(() => {
    let aux;
    aux = Math.floor(window.innerWidth / 300);
    if (aux > 5) aux = 5;
    if (aux > 0) return aux;
  });

  useEffect(() => {
    function handleWindowSize() {
      let aux;
      aux = Math.floor(window.innerWidth / 300);
      if (aux > 5) aux = 5;
      if (aux > 0) setNumberElements(aux);
    }
    window.addEventListener("resize", handleWindowSize);
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const accessToken = localStorage.getItem("accessToken");

  let config;
  if (accessToken) {
    config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };
  }

  useEffect(() => {
    api.get("products/?release=true", config).then((response) => {
      const prod = response.data;
      const auxArray = [];
      const quotient = Math.floor(prod.length / numberElements);
      const remainder = prod.length % numberElements;

      for (let i = 0; i < quotient; i++) {
        const elements = [];
        for (let j = 0; j < numberElements; j++) {
          elements.push(prod[i * numberElements + j]);
        }
        auxArray.push(elements);
      }

      const lastElements = [];
      for (let i = 0; i < remainder; i++) {
        lastElements.push(prod[quotient * numberElements + i]);
      }
      if (lastElements.length > 0) auxArray.push(lastElements);

      setProducts(auxArray);
    });
    // eslint-disable-next-line
  }, [accessToken, numberElements]);

  return (
    <div className="Carousel-Products">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        nextIcon={
          <span aria-hidden="true" className="">
            {" "}
            <img src={nextIcon} alt="produtos anteriores" />
          </span>
        }
        prevIcon={
          <span aria-hidden="true" className="">
            <img src={prevIcon} alt="próximos produtos" />
          </span>
        }
      >
        {products.map((elements, index) => (
          <Carousel.Item key={index}>
            <div className="number">
              {elements.map((product, index) => (
                <NewProductCard product={product} key={index} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
