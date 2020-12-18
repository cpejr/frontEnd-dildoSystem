import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import queryString from 'query-string';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Filters from './Filters';
import { SearchContext } from '../../Contexts/SearchContext';

import api from '../../services/api';

function Search(props) {

  const searchContext = useContext(SearchContext);
  const { search } = useLocation();

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState("");
  const [formattedSearch, setFormattedSearch] = useState();

  useEffect(() => {
    if (categoryId) {
      try {
        api.get('/categories').then(response => {
          const correctCategory = (response.data.find(element => element.id === categoryId));
          if (correctCategory) {
            setCategory(correctCategory.name);
          }
        })
      } catch (error) {
        console.log('Could not fetch categories')
      }
    }
  }, [categoryId]);

  useEffect(() => {

    const queries = queryString.parse(search);
    (queries.search) ? setFormattedSearch(queries.search) : setFormattedSearch();
    (queries.category_id) ? setCategoryId(queries.category_id) : setCategoryId();

  }, [search])

  return (
    <div className="content">
      <div className="content">
        <Header />
      </div>
      <div className="searchpage-content">

        <Filters visible={filtersVisible} setVisible={setFiltersVisible} />

        <div className="results">
          <div className="search-title">
            <div className="search-actual-titles">
              {category && <h2>Buscando em "{category}"</h2>}
              {formattedSearch && <h2>Resultados da sua busca por "{formattedSearch.replace(/%/g, ' ')}"</h2>}
            </div>

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