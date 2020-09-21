import React, {useContext, useEffect, useState} from "react";
import "./styles.css";
import RequestArray from "./request.js";

import api from "../../services/api"
import MainRequest from "./main";
import { LoginContext } from "../../Contexts/LoginContext";



// const MeusPedidos = [
//   {
//     requestNumber: 12345,
//     name: "Sabonete Haus Preto",
//     quantity: 2,
//     productPrice: 15.0,
//     delivery: 2.0,
//     deadline: "07/12",
//   },
//   {
//     requestNumber: 12345,
//     name: "Sabonete Haus Preto",
//     quantity: 2,
//     productPrice: 10.0,
//     delivery: 2.0,
//     deadline: "07/12",
//   },
//   {
//     requestNumber: 12345,
//     name: "Sabonete Haus Preto",
//     quantity: 2,
//     productPrice: 10.0,
//     delivery: 2.0,
//     deadline: "07/12",
//   }, 
// ];

export default function RequestsList() {
  const user = useContext(LoginContext);
  const [Order, setOrder] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  let url;
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(()=>{
    url = `orders/${user.id}`

    api.get(url, config)
    .then((response)=> {
      setOrder(response.data);
      console.log("orders", response.data);
    })
   } , [user]);

  return (
    <div className="request-all">
      <h4>Meus Pedidos</h4>
      <div className="requestlist-container">
        <div className="request-data">
        </div>
        {Order.map((produto, index) => (
          <MainRequest key={`produto-${index}`} produto={produto} />
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="request-all">
  //     <h4>Meus Pedidos</h4>
  //     <div className="requestlist-container">
  //       <div className="request-data">
  //       </div>
  //       {MeusPedidos.map((produto, index) => (
  //         <RequestArray key={`produto-${index}`} produto={produto} />
  //       ))}
  //     </div>
  //   </div>
  // );

}
