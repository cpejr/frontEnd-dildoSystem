import React, { useEffect, useState } from "react";
import "./style.css";
import CarouselImages from "./CarouselImages";
import api from "../../services/api";
import PublishIcon from "@material-ui/icons/Publish";
import ImageUpload from "../../components/ImageUpload";

function Carousel(props) {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [update, setUpdate] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("Carousel", config).then((response) => {
      setImages(response.data);
    });
  }, [update]);

  function handleImage(img) {
    setNewImage(img);
  }

  function handleImages(images) {
    setNewImage(images);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== "") data.append(key, value);
    }

    addToData("imageFile", newImage);

    try {
      const response = await api.post("newCarousel", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.accessToken,
        },
      });
      setUpdate(!update);
      alert(`Nova imagem registrada com sucesso!!`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.log(err.response);
      alert("Erro ao registar imagem!");
    }
  }

  return (
    <div className="EditCarousel-Container">
      {images.map((image, index) => (
        <CarouselImages
          key={`image-${index}`}
          image={image}
          Update={update}
          setUpdate={setUpdate}
        />
      ))}

      <h4>Enviar Nova Imagem</h4>

      <div className="carousel-image-form">
        <div className="input-group mb-3">
          <ImageUpload onChange={handleImage} fileName={"imageFile"} />
        </div>
      </div>
      <div className="enviar-button-carousel">
        <button className="edit-save" onClick={handleSubmit}>
          Enviar Alterações
        </button>
      </div>
    </div>
  );
}

export default Carousel;
