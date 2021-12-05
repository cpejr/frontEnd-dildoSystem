import React, {useContext, useEffect, useState} from "react";
import "./styles.css";

import api from "../../services/api"
import MainRequest from "./main";
import { LoginContext } from "../../Contexts/LoginContext";


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
    })
   } , [user]);

  return (
    <div className="request-all">
      <h4>Meus Pedidos</h4>
      <div className="requestlist-container">
        <div className="request-data">
        </div>
        {Order.map((order, index) => (
          <MainRequest key={`order-${index}`} order={order} />
        ))}
      </div>
    </div>
  );
}
