import React from 'react';
import { useState, useEffect, useHistory } from 'react';
import "./styles.css";
import api from '../../services/api';
import ImageUpload from '../../components/ImageUpload';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PublishIcon from "@material-ui/icons/Publish";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function SubproductsCreate(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [visible, setVisible] = useState(true);
    const [stock_quantity, setQuantity] = useState(0);
    const [min_stock, setMinimum] = useState(0);
    const [image_id, setImage] = useState();
    const [editar, setEditar] = useState();
    const [product_id, setProductId] = useState("");
  
    const accessToken = localStorage.getItem("accessToken");

    const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };
  
    useEffect(() => {
      if (props.wichOne === "editar") {
        setEditar(true);
      }
    }, []);
  

    async function handleSubmit(e) {
      e.preventDefault();
  
      let data = new FormData();
      function addToData(key, value) {
        if (value !== undefined && value !== '')
          data.append(key, value);
      }
  
      addToData('name', name);
      addToData('description', description);
      addToData('stock_quantity', stock_quantity);
      addToData('min_stock', min_stock);
      addToData('visible', visible);
      addToData('imageFile', image_id);
    
      
  
      try {
        const response = await api.post("newSubproduct", data, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.accessToken,
          }
        })
        alert(`Registro concluído!`, response);
      } catch (err) {
        console.log(JSON.stringify(err));
        console.log(err.response);
        alert("Register error");
      }
    }
  
    function handleImage(img) {
      setImage(img);
    }
  
    return (
        <form onSubmit={handleSubmit}>
        <div className="subproduct-form">
        <p className="subproduct-form-title">Nome do subproduto</p>
        <input
          className="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          className="description"
          type="text"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="stock-form1">
          <div className="stock-form2">
          <p className="subproduct-form-title">Estoque</p>
          <div className="mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroupPrepend2"
                >
                  Unidades
          </span>
              </div>
              <input
                type="text"
                value={stock_quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                id="validationDefaultUsername"
                placeholder="0"
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroupPrepend2"
                >
                  Mínimo
          </span>
              </div>
              <input
                type="text"
                value={min_stock}
                onChange={(e) => setMinimum(e.target.value)}
                className="form-control"
                id="validationDefaultUsername"
                placeholder="0"
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
          </div>
          </div>
        </div>
        <div className="images-form">
                        <p className="productTitle">Imagens</p>
                        <label className="images-label" htmlFor="main">
                          Principal
                  </label>
                        <div className="input-group mb-3">
                          <ImageUpload onChange={handleImage} fileName={'imageFile'} />
                        </div>
                        <label className="images-label" htmlFor="secondary">
                          Secudárias
                  </label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupFileAddon01"
                            >
                              <PublishIcon style={{ fontSize: 17 }} />
                            </span>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              className="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Selecione o arquivo
                      </label>
                          </div>
                        </div>
                        <span className="images-label">
                          Formatos aceitos: JPG, PNG
                  </span>
                      </div>
      <div className="sub-buttons">
                      <button className="sub-create-button" type="submit">
                        Criar subproduto
                </button>
                </div>
      </div>
      </form>
    )
}