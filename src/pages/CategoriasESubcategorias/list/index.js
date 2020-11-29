import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';

import { BsTrash } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import { SettingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import api from '../../../services/api';

import './styles.css'
import "antd/dist/antd.css"; 

export default function List2({newCategory}) {
  const [update, setUpdate] = useState(0);
  const [lista, setLista] = useState([]);
  const [submitData, setSubmitData] = useState('');

  const { Panel } = Collapse;

  useEffect(() => {
    console.log('renderizei dnv')
    api.get('/categories').then((response) => {
      // console.log('resposta da chamada',response)
      setLista(response.data)
    })
  }, [update, newCategory])

  function handleClickAddSub(e, data, catId) {
    e.preventDefault();
    // console.log('esse eh o data dentro do handle: ', data)

    const sendData = {
      name: data,
      category_id: catId
    }

    api.post('newSubcategory', sendData, config).then(() => {
      notification.open({
        message: 'Sucesso!',
        description:
          'Subcategoria criada com sucesso.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
        style: {
          width: 600,
        },
      });
      setUpdate(!update)
    })


  }

  function handleClickButton(e, sub_id) {

    api.delete(`/subcategory/${sub_id}`, config).then(() => {
      notification.open({
        message: 'Sucesso!',
        description:
          'Subcategoria deletada com sucesso.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
        style: {
          width: 600,
        },
      });
      setUpdate(!update)
    })
  }


  function callback(key) {
    console.log(key);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.accessToken,
    }
  }

  function handleClickCategoryTButton(vazio, catId) {
    if(vazio.length === 0){
      console.log(vazio.length, catId)
      api.delete(`/category/${catId}`, config).then(() => {
        notification.open({
          message: 'Sucesso!',
          description:
            'Categoria deletada com sucesso.',
          className: 'ant-notification',
          top: '100px',
          icon: <AiOutlineCheckCircle style={{ color: '#DAA621' }} />,
          style: {
            width: 600,
          },
        });
        setUpdate(!update)
      })
    }
    else {
      notification.open({
        message: 'Erro!',
        description:
          'Categoria deve estar vazia antes de ser deletada.',
        className: 'ant-notification',
        top: '100px',
        icon: <AiOutlineCloseCircle style={{ color: '#DAA621' }} />,
        style: {
          width: 600,
        },
      });
    }
  }

  function genExtra(subcategories, catId) {
    return(
      <BsTrash
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
      handleClickCategoryTButton(subcategories, catId)
    }}
    className="trash-icon-cat"
  />
    )
  }


  function SubListComponent({ sub }) {

    return (
      // se for o final do map, colocar o componente de
      // adicionar subcategoria

      <div className="sub-wrapper-area">
        <span className="list-cat-sub"  >
          {sub.name}
        </span>
        <div className="button-area-sub">
          <button
            className="trash-button-sub"
            onClick={(e) => handleClickButton(e, sub.id)}>
            < BsTrash />
          </button>
        </div>
      </div>
    )
  }

  return (
    <Collapse defaultActiveKey={['']} onChange={callback} className="collapse-sub">
      {
        lista.map((cat, i) => {
          return (
          <Panel header={cat.name} key={i+1} extra={genExtra(cat.subcategories, cat.id)}>
            {
            cat.subcategories.map((sub, i) => {
            return (< SubListComponent key={i} sub={sub}/>)
          })
          }
          <div className="sub-wrapper-area">
            <span className="list-cat-add-sub" >
              
              <form onSubmit={(e) => handleClickAddSub(e, submitData, cat.id)}>
                <input type='text' onChange={(e) => setSubmitData(e.target.value)} ></input>
              </form>
              < FaPlusCircle />
                  (adicionar subcategoria)
            </span>
          </div>
          </Panel>
          )
        })
      }
    </Collapse>
  )
};


