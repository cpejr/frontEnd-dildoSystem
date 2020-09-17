import React, { useState, useEffect, useContext } from 'react';
import { FiFilter } from 'react-icons/fi';

import Header from '../../components/Header';
import Header2 from '../../components/Header2';
import ProductCard from '../../components/ProductCard';
import Filters from './Filters';
import {SearchContext} from '../../Contexts/SearchContext';

function Search(props) {

  const searchContext = useContext(SearchContext);

  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <div className="content">
      <div className="content">
        <Header2 />
      </div>
      <div className="searchpage-content">

        <Filters visible={filtersVisible} setVisible={setFiltersVisible} />

        <div className="results">
          <div className="search-title">
            {searchContext.rawSearch && <h2>Resultados da sua busca por "{searchContext.rawSearch.replace(/%/g, ' ')}"</h2>}
            <div className="filter-icon" onClick={()=>{setFiltersVisible(!filtersVisible)}}>
              <FiFilter />
            </div>
          </div>

            <ProductCard />

        </div>


      </div>
    </div>
  );
}

export default Search;