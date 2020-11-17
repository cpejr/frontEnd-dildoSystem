import React, { useEffect, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';
import './styles.css'

import api from '../../services/api';
import Lista from './list/index.js';

export default function CatNSubCat() {

  return (
    <div>
      <h1 className="cat-title">Categorias</h1>
      <div className="info-search-area">
        
        <p className="descrip-cat">
          Você poderá pesquisar, visualizar e editar
          as categorias selecionando-as na lista abaixo. Para
          excluir uma categoria, é necessário que esta não possua
          subcategorias e produtos. Você também poderá adicionar
          uma nova categoria na área ao lado.
        </p>
        <button className="add-cat">
          <FaPlusCircle />
          <span className="add-cat-descrip">Adiconar Categorias</span>
        </button>

      </div>
      <div className="cat-table" >
        <div className="cat-table-header">
          <span> Categoria </span>
        </div>
        <div className="list-wrapper">

        <Lista  />
        
        </div>
        
      </div>
    </div>
  )
}