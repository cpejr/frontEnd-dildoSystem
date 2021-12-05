import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { formatDate } from '../FormatDate/index'
import api from "../../services/api";
import { LoginContext } from "../../Contexts/LoginContext";

export default function RequestDetails(props) {
  function RequestProducts(props) {
    return props.products.map((product) => {
      return (
        <div>
          <strong className="request-name">{product.name}</strong>
          <p>{`R$ ${product.price}`}</p>
          <p>Quantidade: {product.product_quantity}</p>

        </div>
      );
    });
  }

  const [orderProducts, setOrderProducts] = useState();
  const [id, setOrderId] = useState();
  const [date, setDate] = useState();
  const [track_type, setTrackType] = useState();
  const [track_number, setTrackNumber] = useState();
  const [order_status, setOrderStatus] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();
  const [totalprice, setTotalPrice] = useState();
  const [track_price, setTrackPrice] = useState();

  const accessToken = localStorage.getItem("accessToken");

  const user = useContext(LoginContext);
  const url = `order/${user.id}?order_id=${props.match.params.id}`;
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  function SumProducts(products){
    let totalSum = 0;
    products.forEach(product => {
      totalSum += product.product_quantity * product.price
    });
    return(
     totalSum
    )
  }

  useEffect(() => {
    const orderData = props.location.state;
    if (props.location.state) {
      setOrderProducts(orderData);
      setOrderId(orderData.id);
      setDate(orderData.created_at);
      setTrackType(orderData.track_type);
      setTrackNumber(orderData.track_number);
      setOrderStatus(orderData.order_status);
      setStreet(orderData.street);
      setNumber(orderData.number);
      setNeighborhood(orderData.neighborhood);
      setCity(orderData.city);
      setState(orderData.state);
      setZipcode(orderData.zipcode);
      setTrackPrice(orderData.track_price);
      setTotalPrice(orderData.totalPrice);
    } else if (accessToken) {
      api.get(url, config).then((response) => {
        setOrderProducts(response.data);
        setOrderId(response.data.id);
        setDate(response.data.created_at);
        setTrackType(response.data.track_type);
        setTrackNumber(response.data.track_number);
        setOrderStatus(response.data.order_status);
        setStreet(response.data.street);
        setNumber(response.data.number);
        setNeighborhood(response.data.neighborhood);
        setCity(response.data.city);
        setState(response.data.state);
        setZipcode(response.data.zipcode);
        setTrackPrice(response.data.track_price);
        setTotalPrice(SumProducts(response.data.products));
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
            <p>{formatDate(date)}</p>
          </div>
          <div className="rd-info-list">
            <strong>Forma de Pagamento:</strong>
            <p>{track_type}</p>
          </div>
          <div className="rd-info-list">
            <strong>Status do Pedido:</strong>
            <p>{order_status}</p>
          </div>
          <div className="rd-info-list">
            <strong>Código de Rastreio:</strong>
            {track_number ? <p>{track_number}</p> : <p>Indisponível (ainda será postado pela loja).</p> }
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
            {orderProducts && (
              <RequestProducts products={orderProducts.products} />
            )}
          </div>
        </div>
        <div className="rd-price">
          <div className="rd-product-list">
            <h5>Resumo</h5>
            <div className="rd-product-item">
              <strong>Subtotal:</strong>
              <p>{`R$ ${Math.round(totalprice * 100)/100}`}</p>
            </div>
            <div className="rd-product-item">
              <strong>Frete:</strong>
              <p>{`R$ ${Math.round(track_price * 100)/100}`}</p>
            </div>
            <div className="rd-product-item">
              <h6>Total:</h6>
              <h6 className="rd-product-item-total">{`R$ ${Math.round((totalprice + track_price)* 100)/100}`}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
