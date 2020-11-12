import React, { useState, useEffect } from 'react'

import InventoryPage from './InventoryPage';
import api from '../../services/api';

import './styles.css';

export default function InventoryControl() {
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState(0);

    const [formattedSearch, setFormattedSearch] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('categories').then(response => {
          setCategories(response.data);
        })
      }, []);

    function handleSubmit(event) {
        event.preventDefault();

        let newFormattedSearch;

        if(search) {
            newFormattedSearch = search.replace(/ /g, '%');
            newFormattedSearch = newFormattedSearch.normalize('NFD');
        }

        console.log(newFormattedSearch);

        setFormattedSearch(newFormattedSearch);
    }

    return (
        <div className="admin-product-selector">
            <form className="search-edit-form" onSubmit={handleSubmit}>
                <input type="text" className ="input-search" name="searchTerm" placeholder="Pesquise o produto a editar" value={search} onChange={e => setSearch(e.target.value)} />

                <div className="category-and-button">
                    <select className="select-category" name="category" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                        <option value={0} default>Categoria</option>
                        {categories.map(
                            cat => <option value={cat.id} key={`cat-${cat.id}`}>{cat.name}</option>
                            )}
                    </select>

                    <button type="submit">Buscar</button>
                </div>

            </form>
            <InventoryPage search={formattedSearch} categoryId={categoryId}  />
        </div>
    )
}