import React from "react";
import { useState, useEffect, useHistory } from "react";
import "./styles.css";
import api from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PublishIcon from "@material-ui/icons/Publish";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ImageLoader from "react-loading-image";
import loading from "../../images/Loading.gif";

export default function SubproductsEdit({ subproduto }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState(0);
  const [min_stock, setMinimum] = useState(0);
  const [image_id, setImage] = useState();
  const [imageFile, setimageFile] = useState();
  

  const [editar, setEditar] = useState("editar");

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };


  useEffect(() => {
    if (subproduto !== undefined) {
      setName(subproduto.name);
      setDescription(subproduto.description);
      setVisible(Boolean(subproduto.visible));
      setQuantity(subproduto.stock_quantity);
      setMinimum(subproduto.min_stock);
    }
  }, [subproduto]);

  useEffect(() => {
    if (subproduto.wichOne === "editar") {
      setEditar(true);
    }
  }, []);

  const handleDeleteSubproduct = () => {
    api.delete(`subproducts/${subproduto.id}`, config).then((response) => {
      console.log(response);
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {};
    function addToData(key, value) {
      if (value !== undefined && value !== "") data = { ...data, [key]: value };
    }

    addToData("name", name);
    addToData("description", description);
    addToData("stock_quantity", stock_quantity);
    addToData("min_stock", min_stock);
    addToData("visible", visible);
    addToData("imageFile", image_id);

    try {
      const response = await api.put(
        `updateSubproduct/${subproduto.id}`,
        data,
        {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        }
      );
      console.log("teste date:", data);
      alert(`Edição concluída!`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.err(err.response);
      alert("Edição impedida");
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
                  <span className="input-group-text" id="inputGroupPrepend2">
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
                  <span className="input-group-text" id="inputGroupPrepend2">
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
          <ImageLoader
            className="image-loader-sub"
            src={`https://docs.google.com/uc?id=${subproduto.image_id}`}
            loading={() => <img src={loading} alt="Loading..." />}
            error={() => <div>Error</div>}
          />
          <br></br>
          <label className="images-label" htmlFor="main">
            Principal
          </label>
          <div className="input-group mb-3">
            <ImageUpload onChange={handleImage} fileName={"imageFile"} />
          </div>
          <label className="images-label" htmlFor="secondary">
            Secudárias
          </label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
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
              <label className="custom-file-label" for="inputGroupFile01">
                Selecione o arquivo
              </label>
            </div>
          </div>
          <span className="images-label">Formatos aceitos: JPG, PNG</span>
        </div>
        <div className="sub-buttons">
          <button
            className="sub-del-button"
            onClick={(e) => handleDeleteSubproduct()}
            type="submit"
          >
            Excluir Subproduto
            <DeleteForeverIcon />
          </button>
          <button className="sub-edit-button" type="submit">
            Enviar Alterações
          </button>
        </div>
      </div>
    </form>
  );
}
