import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function MultipleUploader({ onChange, canSubmit, canDelete }) {
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
        if (onChange) onChange(images);
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

                {canSubmit ?
                    <button className="send-button" type="submit" onClick={(e) => { handleSubmit(e) }}>Enviar</button> : <div></div>
                }
            </div>
            {canDelete ?
                <div className="delete-file">
                    <input type="text" value={selected} className="id-selector" onChange={(e) => { setSelected(e.target.value) }} placeholder="Digite um ID" />
                    <button type="submit" className="send" onClick={(e) => handleDelete(e, selected)}>deletar</button>
                </div> : <div></div>
            }

        </div>
    );
};