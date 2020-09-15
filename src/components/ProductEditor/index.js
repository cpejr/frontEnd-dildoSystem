import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import api from "../../services/api";
import "./styles.css";
import ImageUpload from '../../components/ImageUpload';
import { useHistory } from "react-router-dom";

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

export default function ProductEditor(props, { id, className, fileName, onSubmit, match }) {
  // console.log(props);
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
  const [image_id, setImage] = useState();
  const [subcategory_id, setSubcategory] = useState(0);
  const [category_id, setCategory] = useState();
  const [weight, setWeight] = useState();

  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [fullWidth, setFullWidth] = React.useState();
  const [maxWidth, setMaxWidth] = React.useState('md');
  const history = useHistory();


  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    history.goBack();
    setOpen(false);
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [editar, setEditar] = useState("editar");

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    console.log(props);
    const url = `product/${props.match.params.id}`;


    if (props.location.state) {
      const product = props.location.state;
      setName(product.name);
      setDescription(product.description);
      setClientPrice(product.client_price);
      setClientSalePrice(product.client_sale_price);
      setWholesalerPrice(product.wholesaler_price);
      setWholesalerSalePrice(product.wholesaler_sale_price);
      setOnsaleClient(Boolean(product.on_sale_client));
      setOnsaleWholesaler(Boolean(product.on_sale_wholesaler));
      setFeatured(Boolean(product.featured));
      setVisible(Boolean(product.visible));
      setState({
        checkedB: Boolean(product.on_sale_client),
        checkedC: Boolean(product.on_sale_wholesaler),
        checkedD: Boolean(product.featured),
        checkedA: Boolean(product.visible)
      });
      setQuantity(product.stock_quantity);
      setMinimum(product.min_stock);
      //setImage(product.image_id);
      setSubcategory(product.subcategory_id);
      setWeight(product.weight);

      console.log('used props product')
    } else if (accessToken) {
      api.get(url, config).then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setClientPrice(response.data.client_price);
        setClientSalePrice(response.data.client_sale_price);
        setWholesalerPrice(response.data.wholesaler_price);
        setWholesalerSalePrice(response.data.wholesaler_sale_price);
        setOnsaleClient(Boolean(response.data.on_sale_client));
        setOnsaleWholesaler(Boolean(response.data.on_sale_wholesaler));
        setFeatured(Boolean(response.data.featured));
        setVisible(Boolean(response.data.visible));
        setState({
          checkedB: Boolean(response.data.on_sale_client),
          checkedC: Boolean(response.data.on_sale_wholesaler),
          checkedD: Boolean(response.data.featured),
          checkedA: Boolean(response.data.visible)
        });
        setQuantity(response.data.stock_quantity);
        setMinimum(response.data.min_stock);
        //setImage(response.data.image_id);
        setSubcategory(response.data.subcategory_id);
        setWeight(response.data.weight);
      });
      console.log('called api')
    }
  }, []);


  useEffect(() => {
    if (props.wichOne === "editar") {
      setEditar(true);
    }
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setVisible(!visible);
    const source = event.target.name
    switch (source) {
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
    addToData('weight', weight);

    try {
      const response = await api.put(`updateProduct/${props.match.params.id}`, data, config
      )
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
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="editDialog" >
        <div className="new-product-all">
          <form onSubmit={handleSubmit}>
            <div className="product-title-page">
              <DialogTitle id="responsive-dialog-title">{"Editar produto"}</DialogTitle>
              <DialogContent>
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
                    </div>
                    <div className="edit-separator"></div>
                    <div className="right-form-dois">
                      <div className="right-form">
                        <div className="config-form">
                          <p className="productTitle">Configuração</p>
                          {/*SWITCHS...*/}
                          <div className="switchConfig">
                            <FormControlLabel
                              control={
                                <IOSSwitch
                                  value={visible}
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
                                  value={on_sale_client}
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
                                  value={on_sale_wholesaler}
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
                                  value={featured}
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
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
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
                                <select name="cars" id="cars">
                                  <option value="0" id="0">Selecionar</option>
                                  <option value="1" id="1">Cosméticos</option>
                                  <option value="2" id="2">Acessórios</option>
                                  <option value="3" id="3">Brincadeiras</option>
                                  <option value="4" id="4">Próteses</option>
                                </select>
                              </div>
                              <div className="categoriesSelection">
                                <label
                                  className="category-label"
                                  htmlFor="subcategory"
                                >
                                  Subcategoria:
                          </label>
                                <select value={subcategory_id} onChange={(e) => setSubcategory(e.target.value)}>
                                  <option value="0" id="0">Selecionar</option>
                                  <option value="1" id="1">Volvo</option>
                                  <option value="2" id="2">Saab</option>
                                  <option value="3" id="3">Mercedes</option>
                                  <option value="4" id="3">Brincadeiras</option>
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
                        <button type="submit">ENVIAR ALTERAÇÕES</button>
                      </div>
                    )}
                </div>
              </DialogContent>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}


