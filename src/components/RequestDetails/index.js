import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api";
import { LoginContext } from "../../Contexts/LoginContext";

export default function RequestDetails(props) {
  const [orderData, setOrder] = useState();
  const [id, setOrderId] = useState();
  const [date, setDate] = useState();
  const [track_type, setTrackType] = useState();
  const [order_status, setOrderStatus] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();
  const [name, setName] = useState();
  const [product_quantity, setQuantity] = useState();
  const [totalprice, setTotalPrice] = useState();
  const [track_price, setTrackPrice] = useState();
  
  const accessToken = localStorage.getItem("accessToken");
  
  const user = useContext(LoginContext);
  const url = `order/${user.id}?order_id=${props.match.params.id}`;
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };
  console.log("url", url)
  useEffect(() => {
    // const url = `orders/${props.match.params.id}`
    const orderData = props.location.state;

    if (props.location.state) {
      setOrder(orderData.order);
      setOrderId(orderData.order.id);
      setDate(orderData.order.created_at);
      setTrackType(orderData.order.track_type);
      setOrderStatus(orderData.order.order_status);
      setStreet(orderData.order.street);
      setNumber(orderData.order.number);
      setNeighborhood(orderData.order.neighborhood);
      setCity(orderData.order.city);
      setState(orderData.order.state);
      setZipcode(orderData.order.zipcode);
      setName(orderData.name);
      setQuantity(orderData.order.id);
      setTrackPrice(orderData.order.track_price);
    } else if(accessToken){
      api.get(url, config).then((response) => {
        setOrder(response.data);
        setOrderId(response.data.id);
        setDate(response.data.created_at);
        setTrackType(response.data.track_type);
        setOrderStatus(response.data.order_status);
        setStreet(response.data.street);
        setNumber(response.data.number);
        setNeighborhood(response.data.neighborhood);
        setCity(response.data.city);
        setState(response.data.state);
        setZipcode(response.data.zipcode);
        setName(response.data.id);
        setQuantity(response.data.id);
        setTrackPrice(response.data.track_price);
      });
    }
  }, []);
  
  return (
    <div className="rd-container">
      <div className="rd-title">
        <h4>Detalhes do Pedido</h4>
        <p>{id}</p>
      </div>

      <div className="rd-content">
        <div className="rd-info">
          <h5>Informações do Pedido</h5>
          <div className="rd-info-list">
            <strong>Data do Pedido:</strong>
            <p>{date}</p>
          </div>
          <div className="rd-info-list">
            <strong>Forma de Pagamento:</strong>
            <p>{track_type}</p>
          </div>
          <div className="rd-info-list">
            <strong>Status do Pedido:</strong>
            <p>{order_status}</p>
          </div>
        </div>
        <div className="rd-data">
          <h5>Endereço de Entrega</h5>
          <div className="rd-adress">
            <strong>Rua</strong>
            <p>{street}</p>
            <strong>Número</strong>
            <p>{number}</p>
            <strong>Bairro</strong>
            <p>{neighborhood}</p>
            <strong>Cidade</strong>
            <p>{city}</p>
            <strong>Estado</strong>
            <p>{state}</p>
            <strong>CEP</strong>
            <p>{zipcode}</p>
          </div>
        </div>
        <div className="rd-product">
          <h5>Produtos</h5>
          <div className="rd-product-list">
            <strong>Nome do Produto</strong>
            <p>{name}</p>
            <p>Quantidade</p>
            <p>{product_quantity}</p>
          </div>
        </div>
        <div className="rd-price">
          <div className="rd-product-list">
            <h5>Resumo</h5>
            <div className="rd-product-item">
              <strong>Subtotal:</strong>
              <p>20</p>
            </div>
            <div className="rd-product-item">
              <strong>Frete:</strong>
              <p>{`R$ ${(track_price)}`}</p>
            </div>
            <div className="rd-product-item">
              <h6>Total:</h6>
              <h6 className="rd-product-item-total">25</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
