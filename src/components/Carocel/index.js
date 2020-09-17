import React, { useEffect, useState } from "react";
import "./style.css";
import CarocelImages from "./CarocelImages";
import api from "../../services/api";

function Carocel(props) {
  const [Images, setImages] = useState();
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("Carocel", config).then((response) => {
      setImages(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      {Images.map((image, index) => (
        <CarocelImages key={`image-${index}`} image={image} />
      ))}
    </div>
  );
}

export default Carocel;
