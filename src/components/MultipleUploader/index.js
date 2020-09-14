import React, { useState } from "react";
import api from "../../services/api";
import PublishIcon from "@material-ui/icons/Publish";

import "./styles.css";

export default function ImageUpload({ onChange, onSubmit }) {
    const [images, setImages] = useState(null);
    const [images_names, setImagesNames] = useState();

    function changeHandler(evt) {
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

    async function handleSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        function addToData(key, value) {
            if (value !== undefined && value !== '')
                data.append(key, value);
        }

        if(images){
            images.forEach((image) => {
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
        } else {
            alert("Upload falho, nenhuma imagem foi selecionada!");
        }
    }

    return (
        <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
                <PublishIcon style={{ fontSize: 17 }} />
            </span>
            <div className="selector-row">
                <select className="file-select">
                    <option className="fileName" key="default" selected disabled hidden>Selecione arquivos</option>
                    {images_names ? images_names.map((names) => {
                        return (
                            <option className="fileName" key={names}>{names}</option>
                        )
                    }) : "Selecione arquivos"}
                </select>
                <input
                    type="file"
                    id="files"
                    className="multiple-input"
                    name={"teste"}
                    onChange={changeHandler}
                    multiple
                >Browse</input>
                {/* <label className="custom-file-label" for="inputGroupFile01" htmlFor="fileName">
                </label> */}
            </div>

            {/* <div className="selected-info">
                {images_names ? images_names.map((name) => {
                    return (
                        <h5 key={name}>/ {name} /</h5>
                    )
                }) : "Selecione um arquivo"}
            </div>
            <input className="file-input" type="file" onChange={(e) => { changeHandler(e) }} multiple /> */}
            <button className="send-button" type="submit" onClick={(e) => { handleSubmit(e) }}>Enviar</button>
        </div>
    );
};