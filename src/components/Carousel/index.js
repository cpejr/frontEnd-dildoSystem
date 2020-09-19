import React, { useEffect, useState } from "react";
import "./style.css";
import CarouselImages from "./CarouselImages";
import api from "../../services/api";
import PublishIcon from "@material-ui/icons/Publish";

function Carousel(props) {
  const [Images, setImages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    console.log("aAAAAAAAAAAAAAAAAAAAAAAA");
    api.get("Carousel", config).then((response) => {
      setImages(response.data);
    });
  }, []);

  return (
    <div className="EditCarousel-Container">
      {Images.map((image, index) => (
        <CarouselImages key={`image-${index}`} image={image} />
      ))}

<h4>Enviar Nova Imagem</h4>
<div className="carousel-image-form">
      <label className="images-label" htmlFor="secondary"></label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupFileAddon01">
            <PublishIcon style={{ fontSize: 17 }} />
          </span>
        </div>
        <div className="custom-file">
          
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          />
          <label className="custom-file-label" for="inputGroupFile01">
            Selecione o arquivo
          </label>
        </div>
      </div>
      </div>
      <div className="enviar-button-carousel">
        <button className="edit-save" type="submit">
          Enviar Alterações
        </button>
      </div>
    </div>
  );
}

export default Carousel;
