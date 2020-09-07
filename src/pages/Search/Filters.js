import React, { useState, useEffect } from 'react';

import './styles.css'
import api from '../../services/api';

function Filters(props) {

  const [max_price, setMax_Price] = useState('');
  const [min_price, setMin_Price] = useState('');
  const [order_by, setOrder_by] = useState('');
  const [order_ascending, setOrder_ascending] = useState();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory_id, setSubcategory_id] = useState('');

  const [categories, setCategories] = useState();

  function handleFilters(event) {
    event.preventDefault();
    console.log(min_price,max_price, order_by,search, categoryId, subcategory_id)
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
          <input type="number" name="min-price" id="min-price" value={min_price} onChange={e=>setMin_Price(e.target.value)} />
          até
          <input type="number" name="max-price" id="max-price" value={max_price} onChange={e=>setMax_Price(e.target.value)}/>
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