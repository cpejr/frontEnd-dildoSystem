import React, { useState } from "react";
import "./styles.css";
import PublishIcon from "@material-ui/icons/Publish";

export default function ImageUpload({
  className,
  fileName,
  onSubmit,
  onChange,
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

  return (
    <div className="input-group-prepend">
      <span className="input-group-text" id="inputGroupFileAddon01">
        <PublishIcon style={{ fontSize: 17 }} />
      </span>
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
  );
}
