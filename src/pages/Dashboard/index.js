import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/index';
import ProductCard from '../../components/ProductCard';
import CarouselProducts from '../../components/CarouselProducts/CarouselProducts';
import ControlledCarousel from '../../components/Slider/Slider';
import Footer from '../../components/Footer';
import CarouselFooter from '../../components/CarouselFooter';
import FeaturedImages from '../../components/DashboardNewImages';
import Instafeed from '../../components/Instafeed';

import './styles.css';

function Dashboard(props) {
    const [search, setSearch] = useState();

    useEffect(() => {
        let newSearch = props.location.search;
        const equalsIndex = newSearch.indexOf('=') + 1;
        newSearch = newSearch.substring(equalsIndex);
        setSearch(newSearch);
    }, [props.location.search])

    return (
        <div className="content">
            <div className="content">
                <Header />
            </div>
            <div className="dashboard-content">

                {/* <HomeNavbar /> */}
                <ControlledCarousel />
                <CarouselFooter/>
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
            </div>
            <div>
                <div className="insta-div">
                    <br></br>
                    <h3><img alt="instagram-icon" src="https://imagepng.org/wp-content/uploads/2017/08/instagram-icone-icon-1.png" width="50" height="50"/>    Confira nosso Instagram:</h3>
                {/* <Instafeed /> */}
                </div>
                <br></br>
            </div>
            <div className="insta-footer">
                <Footer />
                </div>
        </div>
    );
};
export default Dashboard;