import React, { useEffect, useState } from "react";
import "./style.css";
import CarouselImages from "./CarouselImages";
import api from "../../services/api";
import ImageUpload from "../../components/ImageUpload";

function Carousel(props) {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [update, setUpdate] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  function handlePositionChange(id, pos) {
    let newarray = [...images];
    for (var i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        newarray[i].position = parseInt(pos);
        setImages(newarray)
      }
    }
  }

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("Carousel", config).then((response) => {
      setImages(response.data.sort(({ position: previousID }, { position: currentID }) => previousID - currentID));
    });
  }, [update]);

  function handleImage(img) {
    setNewImage(img);
  }

  async function handleSubmit(e) {

    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== "") data.append(key, value);
    }

    addToData("imageFile", newImage);

    if (newImage) {

      try {
        const response = await api.post("newCarousel", data, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
        setNewImage(undefined);
      } catch (err) {
        console.log(JSON.stringify(err));
        console.error(err.response);
        alert("Erro ao registar imagem!");
      }
    }

    try {
      const response = await api.put("Carousel", { info: images },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.accessToken,
          },
        });
      setUpdate(!update);
      alert(`Atualizado com sucesso!!`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.error(err.response);
      alert("Erro ao editar posições!");
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
          handlePositionChange={handlePositionChange}
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
