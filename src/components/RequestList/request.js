// import React, {useState, useEffect} from "react";
// import "./styles.css";
// import api from "../../services/api"

// function RequestArray(props) {

//   const[orders, setOrders] = useState([]);

//   useEffect(() => {
//     api.get("orders?byUser=id", {
//       })
//       .then((response) => {
//         setOrders(response.data);
//       });
//   }, []);

//   return (
//     <div className="request-data">
//       <div className="request-number">{`Pedido nº${Number(
//         props.produto.requestNumber
//       )}`}</div>
//       <div className="request-dataImg">s</div>
//       <div className="request-data-all">
//       <div className="request-data2">
//       <div className="request-data21">
//       <div className="request-name">{props.produto.name}</div>
//       </div>
//       <div className="request-data22">
//       <div className="request-deadline">{`Previsão de entrega: até ${String(
//         orders.lenght
//       )}`}</div>
//       <div className="request-delivery">{`Frete: R$${Number(
//         props.produto.delivery
//       ).toFixed(2)}`}</div>
//       </div>
//       </div>
//       <div className="request-data3">
//       <div className="request-data31">
//       <div className="request-quantity">{`Quantidade:${Number(
//         props.produto.quantity
//       )}`}</div>
//       <div className="request-product-price">{`Valor total do produto: R$${Number(
//         props.produto.productPrice
//       ).toFixed(2)}`}</div>
//       </div>
//       <div className="request-data32">
//         <div className="buttons-area">
//       <button className="fiscalnote">Nota Fiscal</button>
//       <button className="requestdetails">Detalhes do Pedido</button>
//       </div>
//       <div className="request-total-price">{`Valor total da compra: R$${Number(
//         props.produto.productPrice * props.produto.quantity +
//           props.produto.delivery
//       ).toFixed(2)}`}</div>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// }

// export default RequestArray;
