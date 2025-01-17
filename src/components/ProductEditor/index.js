import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ImageLoader from "react-loading-image";
import loading from "../../images/Loading.gif";
import { notification } from "antd";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Tag, Tooltip } from "antd";
import SimpleInput from "../NnEProduct/SimpleInput";
import SimpleSwitch from "../NnEProduct/SimpleSwitch";

import api from "../../services/api";
import urlAWS from '../../services/imagesAWS';
import "./styles.css";
import ImageUpload from "../../components/ImageUpload";
import Subedit from "./subedit.js";
import SubproductsCreate from "./subcreate";
import MultipleUploader from "../MultipleUploader";

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

export default function ProductEditor(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client_price, setClientPrice] = useState(0);
  const [client_sale_price, setClientSalePrice] = useState(0);
  const [wholesaler_price, setWholesalerPrice] = useState(0);
  const [wholesaler_sale_price, setWholesalerSalePrice] = useState(0);
  const [on_sale_client, setOnsaleClient] = useState(true);
  const [on_sale_wholesaler, setOnsaleWholesaler] = useState(true);
  const [best_seller, setBest_Seller] = useState(true);
  const [release, setRelease] = useState(true);
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState(0);
  const [min_stock, setMinimum] = useState(0);
  const [image_id, setImageID] = useState();
  const [image, setImage] = useState();
  const [subcategory_id, setSubcategory] = useState(0);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [length, setLength] = useState();
  const [category_id, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategories_ids, setSubcategoriesIds] = useState([]);
  const [images, setImages] = useState([]);
  const [img_url, setImgURL] = useState();

  // const [imageFile, setimageFile] = useState();
  const [subproducts, setSubproducts] = useState([]);
  const [updated, setUpdated] = useState(false);

  // const [open, setOpen] = useState(true);
  // // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const [fullWidth, setFullWidth] = useState();
  // const [maxWidth, setMaxWidth] = useState("md");
  const history = useHistory();

  // const handleMaxWidthChange = (event) => {
  //   setMaxWidth(event.target.value);
  // };

  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   history.goBack();
  //   setOpen(false);
  // };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
  });

  const [editar, setEditar] = useState("editar");

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  function handleCategorySelection(event) {
    const newCat = categories.find((cat) => cat.id === event.target.value);
    if (newCat) {
      setCategoryId(newCat.id);
      setSubcategories(newCat.subcategories);
      setSubcategoriesIds(newCat.subcategories_ids);
    } else {
      setCategoryId(0);
      setSubcategories("");
      setSubcategoriesIds("");
    }
  }

  useEffect(() => {
    const url = `product/${props.match.params.id}`;

    if (props.location.state) {
      const product = props.location.state;
      setProducts(product.subcategories);
      setName(product.name);
      setDescription(product.description);
      setClientPrice(product.client_price);
      setClientSalePrice(product.client_sale_price);
      setWholesalerPrice(product.wholesaler_price);
      setWholesalerSalePrice(product.wholesaler_sale_price);
      setOnsaleClient(Boolean(product.on_sale_client));
      setOnsaleWholesaler(Boolean(product.on_sale_wholesaler));
      setBest_Seller(Boolean(product.best_seller));
      setRelease(Boolean(product.release));
      setVisible(Boolean(product.visible));
      setState({
        checkedB: Boolean(product.on_sale_client),
        checkedC: Boolean(product.on_sale_wholesaler),
        checkedD: Boolean(product.release),
        checkedA: Boolean(product.visible),
        checkedE: Boolean(product.best_seller),
      });
      setQuantity(product.stock_quantity);
      setMinimum(product.min_stock);
      setSubcategory(product.subcategory_id);
      setImageID(product.image_id);
      setWeight(product.weight);
      setLength(product.length);
      setWidth(product.width);
      setHeight(product.height);
      setSubproducts(product.subproducts);
    } else if (accessToken) {
      api.get(url, config).then((response) => {
        setProducts(response.data.subcategories);
        setName(response.data.name);
        setDescription(response.data.description);
        setClientPrice(response.data.client_price);
        setClientSalePrice(response.data.client_sale_price);
        setWholesalerPrice(response.data.wholesaler_price);
        setWholesalerSalePrice(response.data.wholesaler_sale_price);
        setOnsaleClient(Boolean(response.data.on_sale_client));
        setOnsaleWholesaler(Boolean(response.data.on_sale_wholesaler));
        setBest_Seller(Boolean(response.data.best_seller));
        setRelease(Boolean(response.data.release));
        setVisible(Boolean(response.data.visible));
        setState({
          checkedB: Boolean(response.data.on_sale_client),
          checkedC: Boolean(response.data.on_sale_wholesaler),
          checkedD: Boolean(response.data.release),
          checkedA: Boolean(response.data.visible),
          checkedE: Boolean(response.data.best_seller),
        });
        setQuantity(response.data.stock_quantity);
        setMinimum(response.data.min_stock);
        setImageID(response.data.image_id);
        setSubcategory(response.data.subcategory_id);
        setWeight(response.data.weight);
        setLength(response.data.length);
        setHeight(response.data.height);
        setWidth(response.data.width);
        setSubproducts(response.data.subproducts);
      });
    }
  }, []);

  useEffect(() => {
    api.get(`images/${props.match.params.id}`).then((response) => {
      setImages(response.data);
    });
  }, [updated]);

  useEffect(() => {
    if (props.wichOne === "editar") {
      setEditar(true);
    }
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setVisible(!visible);
    const source = event.target.name;
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
        setRelease(!release);
        break;
      case "checkedE":
        setBest_Seller(!best_seller);
        break;
      default:
        console.error("erro no switch (it's nintendo)");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== "") data.append(key, value);
    }

    // let categorizeData = { subcategories_ids: [subcategories_ids] };

    addToData("name", name);
    addToData("description", description);
    addToData("client_price", client_price);
    addToData("client_sale_price", client_sale_price);
    addToData("wholesaler_price", wholesaler_price);
    addToData("wholesaler_sale_price", wholesaler_sale_price);
    addToData("stock_quantity", stock_quantity);
    addToData("min_stock", min_stock);
    addToData("visible", visible);
    addToData("on_sale_client", on_sale_client);
    addToData("on_sale_wholesaler", on_sale_wholesaler);
    addToData("best_seller", best_seller);
    addToData("release", release);
    addToData("imageFile", image);
    addToData("subcategory_id", subcategory_id);
    addToData("weight", weight);
    addToData("height", height);
    addToData("width", width);
    addToData("length", length);

    try {
      const response = await api.put(
        `updateProduct/${props.match.params.id}`,
        data,
        config
      );
      notification.open(
        {
          message: "Sucesso!",
          description: "Edição do produto concluída.",
          className: "ant-notification",
          top: "100px",
          icon: <AiOutlineCheckCircle style={{ color: "#F9CE56" }} />,
          style: {
            width: 600,
          },
        },
        response
      );
    } catch (err) {
      /* console.log(JSON.stringify(err)); */
      console.error(err.response);
      notification.open({
        message: "Erro!",
        description: "Edição do produto impedida.",
        className: "ant-notification",
        top: "100px",
        icon: <AiOutlineCloseCircle style={{ color: "#F9CE56" }} />,
        style: {
          width: 600,
        },
      });
    }
    // try {
    //   await api.put(
    //     `categorize/${props.match.params.id}`,
    //     categorizeData,
    //     config
    //   );
    // } catch (err) {
    //   console.log(JSON.stringify(err));
    //   console.error(err.response);
    //   notification.open({
    //     message: "Erro!",
    //     description: "Edição do produto impedida.",
    //     className: "ant-notification",
    //     top: "100px",
    //     icon: <AiOutlineCloseCircle style={{ color: "#F9CE56" }} />,
    //     style: {
    //       width: 600,
    //     },
    //   });
    // }
    // console.log("subcategories", subcategories_ids);
  }

  function handleImage(img) {
    let img_url = URL.createObjectURL(img);
    setImgURL(img_url);
    setImage(img);
  }

  function handleCloseTag(subcategory_id) {
    api.delete(
      `uncategorize/${props.match.params.id}/${subcategory_id}`,
      config
    );
  }

  function handleDeleteProduct() {
    api
      .delete(`product/${props.match.params.id}`, config)
      .then((response) => {
        notification.open({
          message: "Sucesso!",
          description: "Produto deletado com sucesso.",
          className: "ant-notification",
          top: "100px",
          icon: <AiOutlineCheckCircle style={{ color: "#F9CE56" }} />,
          style: {
            width: 600,
          },
        });
        history.push("/admin/editproduct");
      })
      .catch((err) => {
        JSON.stringify(err.response);
        console.error(err);
        console.error(err.response);
        if (err.response.data.code === 527) {
          notification.open({
            message: "Erro!",
            description:
              "Produto não pode ser deletado pois está incluído em um pedido.",
            className: "ant-notification",
            top: "100px",
            icon: <AiOutlineCloseCircle style={{ color: "#F9CE56" }} />,
            style: {
              width: 600,
            },
          });
        } else {
          notification.open({
            message: "Erro!",
            description: "Falha em deletar o produto.",
            className: "ant-notification",
            top: "100px",
            icon: <AiOutlineCloseCircle style={{ color: "#F9CE56" }} />,
            style: {
              width: 600,
            },
          });
        }
      });
  }

  const handleDeleteSecImage = (image) => {
    // const image_index = e.target.index;
    // const image_id = images[image_index].id;
    // api.delete(`image/${image}`, config).then((response) => { });
    try {
      const response = api.delete(`image/${image}`, config).then((response) => { });
      notification.open(
        {
          message: "Sucesso!",
          description: "Imagem secundária deletada.",
          className: "ant-notification",
          top: "100px",
          icon: <AiOutlineCheckCircle style={{ color: "#F9CE56" }} />,
          style: {
            width: 600,
          },
        },
        response
      );
    } catch (err) {
      /* console.log(JSON.stringify(err)); */
      console.error(err.response);
      notification.open({
        message: "Erro!",
        description: "Não foi possível excluir a imagem.",
        className: "ant-notification",
        top: "100px",
        icon: <AiOutlineCloseCircle style={{ color: "#F9CE56" }} />,
        style: {
          width: 600,
        },
      });
    }
    setUpdated(!updated);
  };
  useEffect(() => {
    if (subcategories_ids && subcategories_ids.length > 0) {
      let categorizeData = { subcategories_ids: [subcategories_ids] };
      // console.log("categorize", categorizeData);
      api
        .put(`categorize/${props.match.params.id}`, categorizeData, config)
        .then((response) => {
          // console.log(response.data);
        });
      api.get(`product/${props.match.params.id}`, config).then((response) => {
        setProducts(response.data.subcategories);
        // console.log(response.data);
      });
      // console.log("Entrou");
    }
  }, [subcategories_ids]);

  return (
    <div>
      <div className="new-product-all">
        <div className="product-title-page">
          <h4>Editar Produto</h4>
          <Tabs
            defaultActiveKey="product"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="product" title="Produto">
              <form onSubmit={handleSubmit}>
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
                                onChange={(e) =>
                                  setClientSalePrice(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setWholesalerPrice(e.target.value)
                                }
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
                        {image_id && (
                          <ImageLoader
                            className="image-loader-sub"
                            src={`${urlAWS}/${image_id}`}
                            loading={() => (
                              <img src={loading} alt="Loading..." />
                            )}
                            error={() => (
                              <div>
                                O arquivo abaixo será adicionado como imagem
                                principal.
                              </div>
                            )}
                          />
                        )}
                        <br></br>
                        <label className="images-label" htmlFor="main">
                          Principal
                        </label>
                        <div className="input-group mb-3">
                          <ImageUpload
                            onChange={handleImage}
                            fileName={"imageFile"}
                            url={img_url}
                          />
                        </div>

                        <label className="images-label" htmlFor="secondary">
                          Secundárias
                        </label>
                        <div className="pres-imgs">
                          {images.map(
                            (image, index) =>
                              image.subproduct_id === null && (
                                <div className="secimage-comp-loader-sub">
                                  <DeleteForeverIcon
                                    className="edit-delete-secimage"
                                    type="button"
                                    onClick={() =>
                                      handleDeleteSecImage(image.id)
                                    }
                                  />
                                  <ImageLoader
                                    className="secimage-loader-sub"
                                    src={`${urlAWS}/${image.id}`}
                                    loading={() => (
                                      <img src={loading} alt="Loading..." />
                                    )}
                                    error={() => <div>Error</div>}
                                  />
                                </div>
                              )
                          )}
                        </div>
                        <MultipleUploader
                          canSubmit={true}
                          canDelete={true}
                          productId={props.match.params.id}
                        />
                        <div className="input-group mb-3">
                          <label
                            className="file-label"
                            for="inputGroupFile01"
                            htmlFor="fileName"
                          ></label>
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
                            <label htmlFor="switch_1">
                              Visível para compradores
                            </label>
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
                            <label htmlFor="switch_2">
                              Em promoção (clientes)
                            </label>
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
                            <label htmlFor="switch_3">
                              Em promoção (Atacadista)
                            </label>
                          </div>
                          <div className="switchConfig">
                            <FormControlLabel
                              control={
                                <IOSSwitch
                                  value={release}
                                  checked={state.checkedD}
                                  onChange={handleChange}
                                  name="checkedD"
                                />
                              }
                              id="switch_4"
                            />
                            <label htmlFor="switch_4">Lançamento</label>
                          </div>
                          <div className="switchConfig">
                            <FormControlLabel
                              control={
                                <IOSSwitch
                                  value={best_seller}
                                  checked={state.checkedE}
                                  onChange={handleChange}
                                  name="checkedE"
                                />
                              }
                              id="switch_5"
                            />
                            <label htmlFor="switch_5">Mais Vendido</label>
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
                                value={weight}
                                className="form-control"
                                id="setProductWeight"
                                onChange={(e) => setWeight(e.target.value)}
                                aria-describedby="inputGroupPrepend2"
                                placeholder="0"
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
                                cm
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
                                cm
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
                                cm
                              </span>
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
                                <select
                                  name="cars"
                                  id="cars"
                                  value={category_id}
                                  onChange={handleCategorySelection}
                                >
                                  <option value="0" disabled>
                                    Selecionar
                                  </option>
                                  {categories.map((cat) => {
                                    return (
                                      <option
                                        value={cat.id}
                                        key={`cat-${cat.id}`}
                                      >
                                        {cat.name}
                                      </option>
                                    );
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
                                <select
                                  onChange={(e) => {
                                    setSubcategoriesIds(e.target.value);
                                  }}
                                  value={subcategories_ids}
                                >
                                  <option value="0" disabled>
                                    Selecionar
                                  </option>
                                  {subcategories.map((subcat) => {
                                    return (
                                      <option value={subcat.id} key={subcat.id}>
                                        {subcat.name}
                                      </option>
                                    );
                                  })}
                                </select>

                                <div className="categoriesSelection">
                                  <label>Subcategorias</label>
                                </div>
                                <div>
                                  {products.map((subcat, index) => {
                                    return (
                                      <Tag
                                        className="edit-tag"
                                        value={subcat.subcategory_id}
                                        closable={index >= 0}
                                        key={subcat.subcategory_id}
                                        onClose={() =>
                                          handleCloseTag(subcat.subcategory_id)
                                        }
                                      >
                                        {subcat.subcategory_name}
                                      </Tag>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {editar ? (
                    <div className="edit-button">
                      <button
                        className="edit-erase"
                        onClick={(e) => handleDeleteProduct()}
                        type="button"
                      >
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
              </form>
            </Tab>
            <Tab eventKey="subproduct" title="Subprodutos">
              {subproducts ? (
                <div className="sub-form">
                  <SubproductsCreate />
                  {subproducts.map((subproduto, index) => (
                    <Subedit subproduto={subproduto} />
                  ))}
                </div>
              ) : (
                  <div className="sub-form">
                    <SubproductsCreate />
                  </div>
                )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
