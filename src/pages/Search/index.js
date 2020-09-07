import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';

function Search(props) {

  const [max_price, setMax_Price] = useState();
  const [min_price, setMin_Price] = useState();
  const [order_by, setOrder_by] = useState();
  const [order_ascending, setOrder_ascending] = useState();
  const [search, setSearch] = useState();
  const [subcategory_id, setSubcategory_id] = useState();

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

        <ProductCard filters={{ max_price, min_price, order_by, order_ascending, search, subcategory_id }} />

      </div>
    </div>
  );
}

export default Search;