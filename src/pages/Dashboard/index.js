import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/index';
import ProductCard from '../../components/ProductCard';
import CarouselProducts from '../../components/CarouselProducts/CarouselProducts';
import ControlledCarousel from '../../components/Slider/Slider';
import Footer from '../../components/Footer';

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

                <h2>LANÇAMENTOS</h2>
                <div className="release-container">
                    <CarouselProducts />
                </div>
                <h2>MAIS VENDIDOS</h2>
                <div className="best_seller-container">
                    <ProductCard best_sellerOnly />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};
export default Dashboard;