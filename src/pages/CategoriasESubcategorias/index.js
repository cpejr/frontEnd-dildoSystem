import React, { useEffect, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';
import './styles.css'
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import api from '../../services/api';
import Lista from './list/index.js';

export default function CatNSubCat() {
  const [newCategory, setNewCategory] = useState(false);

  function ButtonAddCat() {
    const [inputShow, setInputShow] = useState(false);
    const [submitData, setSubmitData] = useState('');
    

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.accessToken,
      }
    }

    function handleClickButton() {
      setInputShow(!inputShow)
    }

    function handleClickAddSub(e, data) {
      e.preventDefault();
      console.log('esse eh o data dentro do handle: ', data)
  
      const sendData = {
        name: data
      }
      // setUpdate(!update)

      api.post('newCategory', sendData, config).then(() => {
        notification.open({
          message: 'Sucesso!',
          description:
            'Categoria criada com sucesso.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
          style: {
            width: 600,
          },
        });
        setNewCategory(!newCategory)
      })
    }

    return (
      <div>
        <button className="add-cat" onClick={() => handleClickButton()}>
          <FaPlusCircle />
          <span className="add-cat-descrip">Adiconar Categorias</span>
        </button>
        {
          inputShow ?
            <span className="list-cat-add-sub" >
              <form onSubmit={(e) => handleClickAddSub(e, submitData)}>
                <input type='text' onChange={(e) => setSubmitData(e.target.value)} ></input>
              </form>
              < FaPlusCircle />
              (adicionar categoria)
            </span>
            :
            ''
        }
      </div>
    )
  }

  return (
    <div className="geral-wrapper-cat-sub">
      <h1 className="cat-title">Categorias</h1>
      <div className="info-search-area">

        <p className="descrip-cat">
          Você poderá pesquisar, visualizar e editar
          as categorias selecionando-as na lista abaixo. Para
          excluir uma categoria, é necessário que esta não possua
          subcategorias e produtos. Você também poderá adicionar
          uma nova categoria na área ao lado.
        </p>
        < ButtonAddCat />

      </div>
      <Lista newCategory={newCategory}/>
    </div>
  )
}