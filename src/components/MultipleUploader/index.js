import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function ImageUpload({ onChange }) {
    const [images_ids, setImages] = useState(null);
    const [images_names, setImagesNames] = useState();

    const changeHandler = (evt) => {
        const files = evt.target.files;

        console.log("Files: ", files);

        let images = [];
        let imagesNames = [];

        files.forEach((file) => {
            images.push(file)
            imagesNames.push(file.name);
        })


        setImages(images);
        setImagesNames(imagesNames);
    };

    const handleSubmit = (evt) =>{
        evt.preventDefault();
    }

    return (
        <div>
            <div>
                <h4>Imagens:</h4>
                {images_names ? images_names.map((name)=>{
                    return(
                        <h5>{name}</h5>
                    )
                }) : <h5></h5>}
            </div>
            <form>
                <input type="file" name="files" onChange={(e) =>{ changeHandler(e)}} multiple/>
                <button type="submit" onClick={(e) => {handleSubmit(e)}}>Enviar</button>
            </form>
        </div>
    );
};