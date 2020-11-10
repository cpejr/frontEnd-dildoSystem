import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/index';
import ProductCard from '../../components/ProductCard';
import ControlledCarousel from '../../components/Slider/Slider';

import './styles.css';

function Dashboard(props) {
    const [search, setSearch] = useState();

    useEffect(() => {
        let newSearch = props.location.search;
        const equalsIndex = newSearch.indexOf('=') + 1;
        newSearch = newSearch.substring(equalsIndex);
        setSearch(newSearch);
    })

    return (
        <div className="content">
            <div className="content">
                <Header />
            </div>
            <div className="dashboard-content">

                {/* <HomeNavbar /> */}
                <ControlledCarousel />

                <h2>PROMOÇÕES</h2>

                <ProductCard featuredOnly />

            </div>
        </div>
    );
};
export default Dashboard;