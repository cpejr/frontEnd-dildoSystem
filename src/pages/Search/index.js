import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import queryString from 'query-string';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import Filters from './Filters';
import { SearchContext } from '../../Contexts/SearchContext';
import WhatsAppButton from '../../components/WhatsAppButton'

import borboletaAmarela1 from '../../images/CASULUS_BORBOLETA_2_AMARELO.png'
import borboletaAmarela2 from '../../images/CASULUS_BORBOLETA_4_AMARELO.png'

import api from '../../services/api';

function Search(props) {

  const searchContext = useContext(SearchContext);
  const { search } = useLocation();

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [subcategoryId, setSubcategoryId] = useState();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [formattedSearch, setFormattedSearch] = useState();

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (categoryId || subcategoryId) {
      try {
        api.get('/categories').then(response => {
          if (categoryId) {
            const correctCategory = (response.data.find(element => element.id === categoryId));
            if (correctCategory) {
              setCategory(correctCategory.name);
              setSubcategory(undefined)
            }
          }
          else if (subcategoryId) {
            const allSubcats = response.data.reduce((acc, curr) => [...acc, ...curr.subcategories], []);
            const correctSubcat = allSubcats.find(element => element.id === subcategoryId);
            if (correctSubcat) {
              setSubcategory(correctSubcat.name);
            }
          }

        })
      } catch (error) {
        console.error(error);
      }
    }
  }, [categoryId, subcategoryId]);

  useEffect(() => {


    const queries = queryString.parse(search);
    (queries.search) ? setFormattedSearch(queries.search) : setFormattedSearch();
    (queries.category_id) ? setCategoryId(queries.category_id) : setCategoryId();
    (queries.subcategory_id) ? setSubcategoryId(queries.subcategory_id) : setSubcategoryId();

  }, [search])

  useEffect(() => {
    setUpdate(!update)
  }, [window.innerHeight])

  return (
    <div className="content" style={{ position: "relative", minHeight: "100vh" }}>

      <Header />

      <div className="searchpage-content">

        <Filters visible={filtersVisible} setVisible={setFiltersVisible} />

        <div className="results">
          <div className="search-title">
            <div className="search-actual-titles">
              {!subcategory && category && <h2>Buscando em "{category}"</h2>}
              {subcategory && <h2>Buscando em "{subcategory}"</h2>}
              {formattedSearch && <h2>Resultados da sua busca por "{formattedSearch.replace(/%/g, ' ')}"</h2>}
            </div>

            <div className="filter-icon" onClick={() => { setFiltersVisible(!filtersVisible) }}>
              <FiFilter />
            </div>
          </div>

          <ProductCard />

          <WhatsAppButton />

        </div>

        <div className='background'>
          <div className='wrapper-background-1'>
            <img src={borboletaAmarela2} className='background-img2' alt='borboletas'></img>
            <img src={borboletaAmarela1} className='background-img1' alt='borboletas'></img>
          </div>
          <div className='wrapper-background-2'>
            <img src={borboletaAmarela1} className='background-img4' alt='borboletas'></img>
            <img src={borboletaAmarela2} className='background-img3' alt='borboletas'></img>
          </div>

        </div>


      </div>
      <div className="footer-div" style={{ /*position: "absolute"*/ bottom: "0", width: window.innerWidth }} shouldUpdate={update}><Footer /></div>
    </div>
  );
}

export default Search;
