import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function MultipleUploader({ onChange, canSubmit, productId, subproductId }) {
    const [images, setImages] = useState([]);
    const [img_urls, setImgUrls] = useState();
    //const [images_names, setImagesNames] = useState();

    const accessToken = localStorage.getItem("accessToken");

    const config = {
        headers: { authorization: `Bearer ${accessToken}` },
      };

    function changeHandler(evt) {

        let img_urls = Array.from(evt.target.files).map((file) =>  URL.createObjectURL(file) );

        console.log(img_urls);
        
        Array.from(evt.target.files).map(
                    (file) => URL.revokeObjectURL(file)
                );

        let files = evt.target.files;

        files = [...files];
       
        let images = [];
        let imagesNames = [];


        files.forEach((file) => {
            images.push(file)
            imagesNames.push(file.name);
        })

        setImgUrls(img_urls);
        setImages(images);
        //setImagesNames(imagesNames);
        if (onChange) onChange(images);
    
    };

    function RenderPhotos(source)  {
        if (img_urls) {
        return source.map((photo, index) => {
            return <img className="loader-img" src={photo} key={photo} alt={`img_${index}`}/>
        }) }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        function addToData(key, value) {
            if (value !== undefined && value !== '')
                data.append(key, value);
        }

        if (images) {
            images.forEach((image) => {
                addToData('imageFiles', image);
            })
            addToData('product_id', productId);
            if (subproductId) {
            addToData('subproduct_id', subproductId)
            }

            try {
                const response = await api.post("images", data, config)
                alert(`Upload com sucesso!`, response);
            } catch (err) {
                console.err(err);
                console.err(err.response);
                alert("Upload falho");
            }
        } else {
            alert("Upload falho, nenhuma imagem foi selecionada!");
        }
    }

    return (
        <div className="input-content">
            <div className="file-selector">
                <div className="selector-row">
                    <input
                        type="file"
                        id="files"
                        className="multiple-input"
                        name={"teste"}
                        onChange={changeHandler}
                        multiple
                    />
                    <label className="file-label" for="inputGroupFile01" htmlFor="fileName">
                    </label>
                </div>
                <div className="sec-images">
                       {RenderPhotos(img_urls)}
                      </div>

                {canSubmit && canSubmit === true ?
                    <button className="send-button" type="submit" onClick={(e) => { handleSubmit(e) }}>Enviar</button> : <div></div>
                }
            </div>
        </div>
    );
};