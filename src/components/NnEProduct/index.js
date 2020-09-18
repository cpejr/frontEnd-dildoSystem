import React, { useState, useEffect, useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import api from "../../services/api";
import "./styles.css";
import ImageUpload from '../../components/ImageUpload';
import MultipleUploader from '../../components/MultipleUploader';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function NewProduct(props, { id, className, fileName, onSubmit }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client_price, setClientPrice] = useState(0);
  const [client_sale_price, setClientSalePrice] = useState(0);
  const [wholesaler_price, setWholesalerPrice] = useState(0);
  const [wholesaler_sale_price, setWholesalerSalePrice] = useState(0);
  const [on_sale_client, setOnsaleClient] = useState(true);
  const [on_sale_wholesaler, setOnsaleWholesaler] = useState(true);
  const [featured, setFeatured] = useState(true); 
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState(0);
  const [min_stock, setMinimum] = useState(0);
  const [weight, setWeight] = useState(0);
  const [image_id, setImage] = useState();
  const [subcategory_id, setSubcategory] = useState(0);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [length, setLength] = useState();
  const [category_id, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [editar, setEditar] = useState();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
      console.log(response.data);
    })
  }, []);

  useEffect(() => {
    if (props.wichOne === "editar") {
      setEditar(true);
    }
  }, []);

  function handleCategorySelection(event) {
    const newCat = categories.find(cat => cat.id == event.target.value);
    if (newCat) {
      setCategoryId(Number(newCat.id));
      setSubcategories(newCat.subcategories);
    }
    else {
      setCategoryId(0);
      setSubcategories('');
    }

  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setVisible(!visible);
    const source = event.target.name
      switch (source){
        case "checkedA":
          setVisible(!visible);
          break;
        case "checkedB":
          setOnsaleClient(!on_sale_client);
          break;
        case "checkedC":
          setOnsaleWholesaler(!on_sale_wholesaler);
          break;
        case "checkedD":
          setFeatured(!featured);
          break;
        default: console.log("erro")
      }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '')
        data.append(key, value);
    }

    addToData('name', name);
    addToData('description', description);
    addToData('client_price', client_price);
    addToData('client_sale_price', client_sale_price);
    addToData('wholesaler_price', wholesaler_price);
    addToData('wholesaler_sale_price', wholesaler_sale_price);
    addToData('stock_quantity', stock_quantity);
    addToData('min_stock', min_stock);
    addToData('visible', visible);
    addToData('on_sale_client', on_sale_client);
    addToData('on_sale_wholesaler', on_sale_wholesaler);
    addToData('featured', featured);
    addToData('imageFile', image_id);
    addToData('subcategory_id', subcategory_id);
    // addToData('weight', weight);

    addToData('weight', weight);
    addToData('height', height);
    addToData('width', width);
    addToData('length', length);

    try {
      const response = await api.post("newProduct", data, {
          headers: {
            "Content-Type" : "application/json",
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
    <div>
      <div className="new-product-all">
        

        <form onSubmit={handleSubmit}>
        <div className="product-title-page">
          <h3>Novo Produto</h3>
        
          <div className="form-wrapper">
            <div className="divisor-teste">
              <div className="left-form">
                <div className="general-form">
                  <p className="productTitle">Geral</p>
                  <label htmlFor="name">Nome do produto</label>
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
                </div>
                <p className="productTitle"> Preço</p>
                <div className="price-form">
                  <div className="left-side">
                    <label htmlFor="client">Cliente</label>
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend3"
                          >
                            R$
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername1"
                          placeholder="00.00"
                          aria-describedby="inputGroupPrepend2"
                          value={client_price}
                          onChange={(e) => setClientPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <label htmlFor="promotional-price-r">
                      Preço Promocional (opcional)
                    </label>
                    <div className="mb-3">
                      <div className="input-group promotionalPrice">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            R$
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername"
                          placeholder="00.00"
                          aria-describedby="inputGroupPrepend2"
                          value={client_sale_price}
                          onChange={(e) => setClientSalePrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-side">
                    <label htmlFor="wholesale">Atacado</label>
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend3"
                          >
                            R$
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername1"
                          placeholder="00.00"
                          aria-describedby="inputGroupPrepend2"
                          value={wholesaler_price}
                          onChange={(e) => setWholesalerPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <label htmlFor="promotional-price-l">
                      Preço Promocional (opcional)
                    </label>
                    <div className="mb-3">
                      <div className="input-group promotionalPrice">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            R$
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername"
                          placeholder="00.00"
                          aria-describedby="inputGroupPrepend2"
                          value={wholesaler_sale_price}
                          onChange={(e) =>
                            setWholesalerSalePrice(e.target.value)
                          }
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
                    
                    <MultipleUploader />
                    
                  </div>
                  <span className="images-label">
                    Formatos aceitos: JPG, PNG
                  </span>
                </div>
              </div>
              <div className="separator"></div>
              <div className="right-form-dois">
                <div className="right-form">
                  <div className="config-form">
                    <p className="productTitle">Configuração</p>
                    {/*SWITCHS...*/}
                    <div className="switchConfig">
                      <FormControlLabel
                        control={
                          <IOSSwitch  
                            value = {visible}
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                          />
                        }
                        id="switch_1"
                      />
                      <label htmlFor="switch_1">Visível para compradores</label>
                    </div>
                    <div className="switchConfig">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            value = {on_sale_client}
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                          />
                        }
                        id="switch_2"
                      />
                      <label htmlFor="switch_2">Em promoção (clientes)</label>
                    </div>
                    <div className="switchConfig">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            value = {on_sale_wholesaler}
                            checked={state.checkedC}
                            onChange={handleChange}
                            name="checkedC"
                          />
                        }
                        id="switch_3"
                      />
                      <label htmlFor="switch_3">Em promoção (Atacadista)</label>
                    </div>
                    <div className="switchConfig">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            value = {featured}
                            checked={state.checkedD}
                            onChange={handleChange}
                            name="checkedD"
                          />
                        }
                        id="switch_4"
                      />
                      <label htmlFor="switch_4">Em destaque</label>
                    </div>
                  </div>
                  <div className="stock-form">
                    <p className="productTitle">Estoque</p>
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
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="setProductWeightSpan"
                          >
                            Peso
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="setProductWeight"
                          // value={weight}
                          // onChange={(e) => setWeight(e.target.value)}
                          aria-describedby="inputGroupPrepend2"
                          required
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            g
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="setProductHeight"
                          >
                            Altura
                          </span>
                        </div>
                        <input
                          type="text"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="form-control"
                          id="setProductHeight"
                          placeholder="0"
                          aria-describedby="inputGroupPrepend2"
                          required
                        />
                         <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            m
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="setProductWidth"
                          >
                            Largura
                          </span>
                        </div>
                        <input
                          type="text"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="form-control"
                          id="setProductWidth"
                          placeholder="0"
                          aria-describedby="inputGroupPrepend2"
                          required
                        />
                         <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            m
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="setProductLength"
                          >
                            Comprimento
                          </span>
                        </div>
                        <input
                          type="text"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="form-control"
                          id="setProductLength"
                          placeholder="0"
                          aria-describedby="inputGroupPrepend2"
                          required
                        />
                         <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            m
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category-form">
                    <p className="productTitle">Categorias</p>
                    <div className="productCategoiries">
                      <div className="categoryLeft">
                        <div className="categoriesSelection">
                          <label
                            className="category-label"
                            htmlFor="main-category"
                          >
                            Principal:{" "}
                          </label> 
                          {/*DROPDOWNS*/}
                          <select name="cars" id="cars" value={category_id} onChange={handleCategorySelection}>
                            <option value="0" disabled>Selecionar</option>
                            {categories.map(cat=> {
                              return <option value={cat.id} key={`cat-${cat.id}`}>{cat.name}</option>
                            })}
                          </select>
                        </div>
                        <div className="categoriesSelection">
                          <label
                            className="category-label"
                            htmlFor="subcategory"
                          >
                            Subcategoria: 
                          </label>
                          <select value={subcategory_id} onChange={(e)=> setSubcategory(e.target.value)}>
                            <option value="0" disabled>Selecionar</option>
                            {subcategories.map(subcat=> {
                              return <option value={subcat.id} key={`subcat-${subcat.id}`}>{subcat.name}</option>
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {editar ? (
              <div className="edit-button">
                <button className="edit-erase" type="submit">
                  Excluir Produto
                  <DeleteForeverIcon />
                </button>
                <button className="edit-save" type="submit">
                  Enviar Alterações
                </button>
              </div>
            ) : (
              <div className="product-button">
                <button type="submit">CRIAR</button>
              </div>
            )}
          </div>
          </div>
        </form>
        </div>
      </div>
  );
}
