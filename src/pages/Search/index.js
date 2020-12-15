import React, { useState, useContext } from 'react';
import { FiFilter } from 'react-icons/fi';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Filters from './Filters';
import Filters2 from './Filters2';
import { SearchContext } from '../../Contexts/SearchContext';

function Search(props) {

  const searchContext = useContext(SearchContext);

  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <div className="content">
      <div className="content">
        <Header />
      </div>
      <div className="searchpage-content">

        <Filters2 visible={filtersVisible} setVisible={setFiltersVisible} />

        <div className="results">
          <div className="search-title">
            {searchContext.rawSearch && <h2>Resultados da sua busca por "{searchContext.rawSearch.replace(/%/g, ' ')}"</h2>}
            <div className="filter-icon" onClick={() => { setFiltersVisible(!filtersVisible) }}>
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