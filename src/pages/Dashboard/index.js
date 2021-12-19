import React, { useState, useEffect, useContext } from "react";

import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import CarouselProducts from "../../components/CarouselProducts/CarouselProducts";
import ControlledCarousel from "../../components/Slider/Slider";
import Footer from "../../components/Footer";
import CarouselFooter from "../../components/CarouselFooter";
import FeaturedImages from "../../components/DashboardNewImages";
// import Instafeed from "../../components/Instafeed";
import WhatsAppButton from "../../components/WhatsAppButton";

import "./styles.css";
import Insta from "../../components/Instagram";

const Dashboard = function (props) {
  return (
    <div className="content">
      <div className="content">
        <Header />
      </div>
      <div className="dashboard-content">
        <ControlledCarousel />
        <CarouselFooter />
        <div className="images-container">
          <FeaturedImages />
        </div>
        <h2>Lançamentos</h2>
        <div className="release-container">
          <CarouselProducts />
        </div>
        <h2>Mais Vendidos</h2>
        <div className="best_seller-container">
          <ProductCard best_sellerOnly />
        </div>
        <WhatsAppButton />
      </div>
      <div>
        {/* OBSERVAÇÃO: GRAÇAS A ERROS DE AUTENTICAÇÃO COM A API DO INSTAGRAM, NÃO ESTA SENDO POSSÍVEL EXIBIR AS ULTIMAS IMAGENS DO INSTAGARM  */}
        <div className="insta-div">
          <br />
          <h3>
            <img
              alt="instagram-icon"
              src="https://imagepng.org/wp-content/uploads/2017/08/instagram-icone-icon-1.png"
              width="50"
              height="50"
            />{" "}
            Confira nosso Instagram:
          </h3>
          <Insta />
        </div>
        <br />
      </div>
      <div className="insta-footer">
        <Footer />
      </div>
    </div>
  );
};
export default Dashboard;
