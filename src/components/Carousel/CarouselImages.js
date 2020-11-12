import React, { useState, useEffect } from "react";
import "./style.css";
import ImageLoader from "react-loading-image";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import loading from "../../images/Loading.gif";
import api from '../../services/api';

function CarouselImages(props) {
  const [newPosition, setNewPosition] = useState();

  useEffect(()=>{
    if(!isNaN(props.image.position))
    setNewPosition(props.image.position)
  },[props.image.position]);

  const accessToken = localStorage.getItem('accessToken')

  const config = {
    headers: { 'authorization': `Bearer ${accessToken}` },
  }

  async function handleDelete(e) {

    try {

      const response = await api.delete('/Carousel/' + props.image.id, config);

      alert(`Imagem deletada com sucesso!`);
      props.setUpdate(!props.update);


    } catch (err) {
      console.error(err);
      alert('Erro ao deletar imagem!');
    }
  }


  return (
    <div className="EditCarousel-Container">
      <div className="image-container">
        <ImageLoader
          src={`https://docs.google.com/uc?id=${props.image.image_id}`}
          loading={() => <img src={loading} alt="Loading..." />}
          error={() => <div>Error</div>}
        />
      </div>
      <div className="position-container">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              Posição
            </span>
          </div>
          <input
            type="text"
            value={newPosition}
            onChange={(e) => {setNewPosition(e.target.value)
              props.handlePositionChange(props.image.id, e.target.value)          
            }}
            className="form-control"
            id="validationDefaultUsername"
            aria-describedby="inputGroupPrepend2"
            required
          />
        </div>
      </div>

      <div className="enviar-button-carousel">

        <button className="edit-delete" type="submit" onClick={handleDelete}>
          Excluir Imagem
  <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
}

export default CarouselImages;
