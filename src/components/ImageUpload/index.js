import React, { useState } from "react";
import "./styles.css";

export default function ImageUpload({
  className,
  fileName,
  onSubmit,
  onChange,
  url,
}) {
  const [image_id, setImage] = useState(null);
  const [image_name, setImageName] = useState();

  const changeHandler = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
    if(file){
    setImageName(file.name);
    }
    
    if (!onSubmit && onChange) onChange(file);
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append(fileName, image_id);
    onSubmit && onSubmit(data);
  };

  function RenderPhotos(url)  {
    if (url) {
        return <div> <br></br> A imagem abaixo será a nova imagem principal: <img alt="loader" className="loader-img" src={url} key={url}/></div>
    }
};

  return (
    <div>
    <div className="input-group-prepend">
      <div className="custom-file">
        <input
          type="file"
          id="files"
          className="custom-file-input"
          name={fileName || "teste"}
          onChange={changeHandler}
        />
        <label className="custom-file-label" for="inputGroupFile01" htmlFor="fileName">
          {image_name || "Selecione o arquivo"}
        </label>
      </div>
      {onSubmit && <button onClick={handleSubmit}>Enviar</button>}
    </div>
    <div className="sec-images">
                       {RenderPhotos(url)}
                      </div>
    </div>
    
  );
}
