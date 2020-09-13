import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function ImageUpload({ onChange, onSubmit }) {
    const [images, setImages] = useState(null);
    const [images_names, setImagesNames] = useState();

    function changeHandler(evt){
        let files = evt.target.files;

        files = [...files];

        let images = [];
        let imagesNames = [];


        files.forEach((file) => {
            images.push(file)
            imagesNames.push(file.name);
        })

        setImages(images);
        setImagesNames(imagesNames);
    };

    async function handleSubmit(e){
        e.preventDefault();

        let data = new FormData();
        function addToData(key, value) {
            if (value !== undefined && value !== '')
                data.append(key, value);
        }
        images.forEach((image) =>{
            addToData('imageFiles', image);
        })

        console.log("Req data: ", data);

        try {
            const response = await api.post("images", data)
            alert(`Upload com sucesso!`, response);
        } catch (err) {
            console.log(err);
            console.log(err.response);
            alert("Upload falho");
        }
    }

    return (
        <div>
            <div>
                <h4>Imagens:</h4>
                {images_names ? images_names.map((name) => {
                    return (
                        <h5 key={name}>{name}</h5>
                    )
                }) : <h5></h5>}
            </div>
            <form>
                <input type="file" name="files" onChange={(e) => { changeHandler(e) }} multiple />
                <button type="submit" onClick={(e) => { handleSubmit(e) }}>Enviar</button>
            </form>
        </div>
    );
};