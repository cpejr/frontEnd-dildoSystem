import React, { useState, useEffect } from 'react';

import './styles.css'
import api from '../../services/api';

function Filters(props) {

  const [max_price, setMax_Price] = useState('');
  const [min_price, setMin_Price] = useState('');
  const [order_by, setOrder_by] = useState('');
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory_id, setSubcategory_id] = useState('');

  const [categories, setCategories] = useState();

  useEffect(() => {
    
    // let newSearch = props.location.search;
    // const equalsIndex = newSearch.indexOf('=') + 1;
    // newSearch = newSearch.substring(equalsIndex);
    console.log(props.initialSearch);
    setSearch(props.initialSearch);
  }, []);

  function handleFilters(event) {
    event.preventDefault();
    let minPrice, maxPrice, orderBy, orderAscending, searchTerm, subcategoryId;

    if(min_price) minPrice = Number(min_price);
    if(max_price) maxPrice = Number(max_price);

    if(order_by) {
      switch(order_by) {
        case 'price-ascending':
          orderBy = 'price';
          orderAscending = true;
          break;
        case 'price-descending':
          orderBy = 'price';
          orderAscending = false;
          break;
        default:
          break;
      }
    }

    if(search) searchTerm = search;

    if(subcategory_id) subcategoryId = Number(subcategory_id);

    console.log(minPrice, maxPrice, orderBy, orderAscending, searchTerm, subcategoryId)
    
    props.setFilters(minPrice, maxPrice, orderBy, orderAscending, searchTerm, subcategoryId);
  }

  function handleCategorySelection() {

  }

  return (
    <div className='filters-container'>
      <form onSubmit={handleFilters}>
        <h4>Filtros</h4>
        <strong>Faixa de preço</strong>
        <div className='price-range'>
          De
          <input type="number" name="min-price" id="min-price" value={min_price} onChange={e=>setMin_Price(e.target.value)} step="0.01" />
          até
          <input type="number" name="max-price" id="max-price" value={max_price} onChange={e=>setMax_Price(e.target.value)} step="0.01"/>
        </div>

        <strong>Ordernar por</strong>
        <select name="order-by" id="order-by" value={order_by} onChange={e=>setOrder_by(e.target.value)}>
          <option default value="relevance">Relevância</option>
          <option value="price-ascending">Preço: do mais baixo para o mais alto</option>
          <option value="price-descending">Preço: do mais alto para o mais baixo</option>
        </select>

        <strong>Termo de pesquisa</strong>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/>

        <strong>Categoria</strong>
        <select name="category" id="category" value={categoryId} onChange={e=>setCategoryId(e.target.value)}>
          <option value="1">Cosméticos</option>
          <option value="2">Acessórios</option>
          <option value="3">Brincadeiras</option>
        </select>
        <strong>Subcategoria</strong>
        <select name="subcategory" id="subcategory" value={subcategory_id} onChange={e=>setSubcategory_id(e.target.value)}>
          <option value="1">Cosm1</option>
          <option value="2">Cosm2</option>
          <option value="3">Cosm3</option>
        </select>

        <button type="submit">Aplicar filtros</button>

      </form>
    </div>
  )
}

export default Filters;