import React, { useEffect, useState } from "react";
import "./styles.css";
import Main from "./main.js";

import api from "../../services/api";

function Orders(props) {
  const [Order, setOrder] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  let url;
  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };
  useEffect(() => {
    if (props.location.myCustomProps !== undefined) {
      setOrder([props.location.myCustomProps]);
      // console.log('esse eh order: ', [props.location.myCustomProps])

    } else if (props.match.params.id !== undefined) {

      url = `orders?byid=${props.match.params.id}`

      if (accessToken) {
        api.get(url, config).then((response) => {
          setOrder(response.data);
          // console.log('esse eh order: ', response.data)
        });
      }
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