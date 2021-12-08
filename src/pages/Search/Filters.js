import React, { useState, useEffect, useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';

import { SearchContext } from '../../Contexts/SearchContext';
import api from '../../services/api';

import './styles.css';

const Filters = function (props) {
  const searchContext = useContext(SearchContext);

  const [max_price, setMax_Price] = useState('');
  const [min_price, setMin_Price] = useState('');
  const [order_by, setOrder_by] = useState('');
  const [search, setSearch] = useState(searchContext.rawSearch || '');
  const [categoryId, setCategoryId] = useState(
    /* searchContext.categoryId || */ '',
  );
  const [subcategory_id, setSubcategory_id] = useState(
    /* searchContext.subcategoryId || */ '',
  );

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const location = useLocation();

  useEffect(() => {
    api.get('categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    setSearch(searchContext.rawSearch);
  }, [searchContext.rawSearch]);

  useEffect(() => {
    let search = location.search.substring(1);
    search = search.replace(/%/g, ' ');
    search = JSON.parse(
      `{"${
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
      }"}`,
    );

    if (search.category_id) {
      setCategoryId(search.category_id);
      if (categories.length > 0) {
        const category = categories.find(
          (cat) => cat.id === search.category_id,
        );
        setSubcategories(category.subcategories);
      }
    }
    if (search.subcategory_id) {
      const correspondingCat = categories.find((cat) => cat.subcategories.some((subcat) => subcat.id === search.subcategory_id));
      if (correspondingCat) {
        setCategoryId(correspondingCat.id);
        setSubcategories(correspondingCat.subcategories);
        setSubcategory_id(search.subcategory_id);
      }
    }
  }, [categories, location.search]);

  function handleSubmit(e) {
    e.preventDefault();
    const searchConfig = {
      minPrice: min_price,
      maxPrice: max_price,
      orderBy: order_by,
      search,
      categoryId,
      subcategoryId: subcategory_id,
    };

    if (props.visible) {
      props.setVisible(false);
    }

    searchContext.handleSearch(searchConfig);
  }

  function handleCategorySelection(event) {
    const newCat = categories.find((cat) => cat.id === event.target.value);
    if (newCat) {
      setCategoryId(newCat.id);
      setSubcategories(newCat.subcategories);
    } else {
      setCategoryId(0);
      setSubcategories('');
    }
  }

  return (
    <div
      className={`filters-container ${
        props.visible && 'visible slide-in-left'
      }`}
    >
      <div className="close-icon-container">
        <GrClose
          className="close-icon"
          onClick={() => {
            props.setVisible(!props.visible);
          }}
        />
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <strong>Ordernar por</strong>
          <select
            name="order-by"
            id="order-by"
            value={order_by}
            onChange={(e) => setOrder_by(e.target.value)}
          >
            <option default value="default">
              {' '}
            </option>
            <option value="price-ascending">
              Preço: do mais baixo para o mais alto
            </option>
            <option value="price-descending">
              Preço: do mais alto para o mais baixo
            </option>
          </select>

          <strong>Termo de pesquisa</strong>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="block-2">
          <strong>Preço</strong>
          <div className="price-range">
            {/* De */}
            <input
              type="number"
              name="min-price"
              id="min-price"
              value={min_price}
              placeholder="MIN"
              onChange={(e) => setMin_Price(e.target.value)}
              step="0.01"
            />
            {/* até */}
            <input
              type="number"
              name="max-price"
              id="max-price"
              value={max_price}
              placeholder="MAX"
              onChange={(e) => setMax_Price(e.target.value)}
              step="0.01"
            />
          </div>
          <button type="submit">Aplicar filtros</button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
