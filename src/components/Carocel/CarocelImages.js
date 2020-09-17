import React, { useState } from "react";
import "./style.css";
import ImageLoader from "react-loading-image";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import loading from "../../images/Loading.gif";

function CarocelImages(props) {
  const [newPosition, setNewPosition] = useState(props.image.position);
  return (
    <div className="EditCarocel-Container">
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
            onChange={(e) => setNewPosition(e.target.value)}
            className="form-control"
            id="validationDefaultUsername"
            aria-describedby="inputGroupPrepend2"
            required
          />
        </div>
      </div>

                    <div className="enviar-button-carocel">

<button className="edit-delete" type="submit">
  Excluir Imagem
  <DeleteForeverIcon />
</button>
</div>
    </div>
  );
}

export default CarocelImages;