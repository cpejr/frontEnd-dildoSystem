import React, { useState, useEffect, useContext } from 'react';
import { FiFilter } from 'react-icons/fi';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Filters from './Filters';
import {SearchContext} from '../../Contexts/SearchContext';

function Search(props) {

  const searchContext = useContext(SearchContext);

  // const [max_price, setMax_Price] = useState();
  // const [min_price, setMin_Price] = useState();
  // const [order_by, setOrder_by] = useState();
  // const [order_ascending, setOrder_ascending] = useState();
  // const [search, setSearch] = useState();
  // const [subcategory_id, setSubcategory_id] = useState();

  // useEffect(() => {
  //   let newSearch = props.location.search;

  //   const equalsIndex = newSearch.indexOf('=') + 1;

  //   newSearch = newSearch.substring(equalsIndex);
  //   if (newSearch && newSearch.indexOf(' ') >= 0) {
  //     newSearch = newSearch.replace(/ /g, '%') //substitui espaços por %
  //     newSearch = newSearch.normalize('NFD'); //retira acentos 
  //   }

  //   setSearch(newSearch);
  // }, [props.location.search]);

  // useEffect(() => {
  //   if (search && search.indexOf(' ') >= 0) {
  //     let newSearch = search.replace(/ /g, '%') //substitui espaços por %
  //     newSearch = newSearch.normalize('NFD'); //retira acentos 
  //     setSearch(newSearch);
  //   }
  // }, [search]);

  // function setFilters(min_price, max_price, order_by, order_ascending, search, subcategory_id) {
  //   setMax_Price(max_price);
  //   setMin_Price(min_price);
  //   setOrder_by(order_by);
  //   setOrder_ascending(order_ascending);
  //   if (search) setSearch(search);
  //   setSubcategory_id(subcategory_id);
  // }

  return (
    <div className="content">
      <div className="content">
        <Header />
      </div>
      <div className="searchpage-content">

        {/* <Filters setFilters={setFilters} /> */}
        <Filters />

        <div className="results">
          <div className="search-title">
            {searchContext.rawSearch && <h2>Resultados da sua busca por "{searchContext.rawSearch.replace(/%/g, ' ')}"</h2>}

            <div className="filter-icon">
              <FiFilter />
            </div>

          </div>

          {
            <ProductCard />
            // <ProductCard search={true} className="on-searchpage" filters={{ min_price, max_price, order_by, order_ascending, search, subcategory_id }} />
          }

        </div>


      </div>
    </div>
  );
}

export default Search;