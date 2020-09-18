import React, { useState } from "react";
import api from "../../services/api";
import PublishIcon from "@material-ui/icons/Publish";

import "./styles.css";

export default function MultipleUploader({ onChange, onSubmit }) {
    const [images, setImages] = useState(null);
    const [images_names, setImagesNames] = useState();
    const [selected, setSelected] = useState();

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

        if (images) {
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

    async function handleDelete(e, selected) {
        e.preventDefault();
        alert("Clicou! ", selected);
        try {
            const response = await api.delete(`image/${selected}`)
            alert(`Deletou com sucesso!`, response);
        } catch (err) {
            console.log(err);
            console.log(err.response);
            alert("Falhou em deletar");
        }
    }

    return (
        <div className="input-content">
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
                    />
                    <label className="file-label" for="inputGroupFile01" htmlFor="fileName">
                    </label>
                </div>

                <button className="send-button" type="submit" onClick={(e) => { handleSubmit(e) }}>Enviar</button>
            </div>
            <div className="delete-file">
                <input type="text" value={selected} className="id-selector" onChange={(e) => {setSelected(e.target.value)}} placeholder="Digite um ID"/>
                <button type="submit" onClick={(e) => handleDelete(e, selected)}>deletar foto</button>
            </div>
        </div>
    );
};