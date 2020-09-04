import React, { useEffect, useState } from "react";
import "./styles.css";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Main from "./main.js";

import api from "../../services/api";


function Orders(props) {
  const [Order, setOrder] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };
  useEffect(() => {
    console.log(props);
    const url = `orders?byid=${props.match.params.id}`;
    if (accessToken) {
      api.get(url, config).then((response) => {
        setOrder(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <div>
      {Order.map((pedido, index) => (
        <Main key={`pedido-${index}`} pedido={pedido} />
      ))}
    </div>
  );
}


export default Orders;