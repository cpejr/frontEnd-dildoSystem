import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

//import api from '../services/api';

const SearchContext = React.createContext({});

function SearchContextProvider(props) {

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [orderBy, setOrderBy] = useState();
  const [orderAscending, setOrderAscending] = useState();
  const [search, setSearch] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subcategoryId, setSubcategoryId] = useState();

  const [rawSearch, setRawSearch] = useState();

  const [initialLoad, setInitialLoad] = useState(true);
  const [searchToggler, setSearchToggler] = useState(false);

  const history = useHistory();

  //Organiza informação quando pesquisa é feita
  function handleSearch(searchConfig) {

    const { minPrice, maxPrice, orderBy, search, categoryId, subcategoryId } = searchConfig;

    let newFilters = { minPrice, maxPrice, orderBy, orderAscending: false, search, categoryId, subcategoryId };

    if (search) {
      newFilters.search = search;
      newFilters.search = newFilters.search.replace(/ /g, '%') //substitui espaços por %
      newFilters.search = newFilters.search.normalize('NFD'); //retira acentos 
    }

    if (minPrice) newFilters.minPrice = Number(minPrice);
    if (maxPrice) newFilters.maxPrice = Number(maxPrice);

    if (orderBy) {
      switch (orderBy) {
        case 'price-ascending':
          newFilters.orderBy = 'price';
          newFilters.orderAscending = true;
          break;
        case 'price-descending':
          newFilters.orderBy = 'price';
          newFilters.orderAscending = false;
          break;
        default:
          newFilters.orderBy = '';
          break;
      }
    }

    if (categoryId) newFilters.categoryId = (categoryId);

    if (subcategoryId) newFilters.subcategoryId = (subcategoryId);

    setMinPrice(newFilters.minPrice);
    setMaxPrice(newFilters.maxPrice);
    setOrderBy(newFilters.orderBy);
    setOrderAscending(newFilters.orderAscending);
    setSearch(newFilters.search);
    setCategoryId(newFilters.categoryId);
    setSubcategoryId(newFilters.subcategoryId);

    setRawSearch(search);

    setSearchToggler(!searchToggler)

  }

  //Uma vez informação atualizada e organizada, monta nova URL e redireciona para ela
  useEffect(() => {

    if (initialLoad) {
      setInitialLoad(false);
    } else {
      let query = '?';

      if (search) query += `search=${search}&`;
      if (minPrice) query += `min_price=${minPrice}&`;
      if (maxPrice) query += `max_price=${maxPrice}&`;
      if (orderBy) query += `order_by=${orderBy}&order_ascending=${orderAscending}&`;
      //if (orderAscending) query += ``;
      if (categoryId) query += `category_id=${categoryId}&`;
      if (subcategoryId) query += `subcategory_id=${subcategoryId}&`;

      if (query.slice(-1) === '&') query = query.substring(0, query.length - 1);

      history.push(`/search${query}`);
    }

  }, [search, minPrice, maxPrice, orderBy, orderAscending, categoryId, subcategoryId, searchToggler]);

  //Puxa pesquisa da url
  useEffect(() => {
    let queries = props.location.search;

    queries = queries.substring(1, queries.length); //retira ?

    let queriesArray = queries.split('&');

    let search;

    queriesArray.forEach((query) => {
      if (query.charAt(0) === 's' && query.charAt(1) === 'e') {
        search = query.substring(7);
        search = search.replace(/%/g, ' ') //substitui % por espaços
        setRawSearch(search);
      }
    })

  })

  return (
    <SearchContext.Provider value={{ handleSearch, rawSearch, categoryId, subcategoryId }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export { SearchContext };

export default withRouter(SearchContextProvider);