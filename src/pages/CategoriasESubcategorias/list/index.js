import React, { useEffect, useState } from 'react';

import './styles.css'

import { FaCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { FaPlusCircle } from 'react-icons/fa';

import api from '../../../services/api';


export default function ListCat(props) {
  const [show, setShow] = useState(false);
  const [id_value, setId_value] = useState('');
  const [ novo, setNovo ] = useState('');
  const [ novoDif, setNovoDif ] = useState('');
  const [ lista, setLista] = useState([]);
  const [ submitData, setSubmitData ] = useState('');

  let arrayLen;
  let confirm;

  const config ={ 
    headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.accessToken,
  }
}


  useEffect(() => {
    api.get('/categories').then((response) => {
      // console.log('resposta da chamada',response)
      setLista(response.data)
    })
  }, [novo, novoDif])
  


  function handleClick(e) {
    setId_value(e.target.id)
    if (show)
      setShow(false)
    else
      setShow(true)
  }

  function handleClickButton(e, sub_id) {

    api.delete(`/subcategory/${sub_id}`,  config ).then(() => {
      alert('Subcategoria deletada com sucesso!')
      setNovo(`t${sub_id}`)
    })

    
  }

  function handleClickAddSub(e, data, catId) {
    e.preventDefault();
    // console.log('esse eh o data dentro do handle: ', data)

    const sendData = {
      name: data,
      category_id: catId
    }

    api.post('newSubcategory', sendData,  config ).then(() => {
      alert('Subcategoria criada com sucesso!')
      setNovoDif(`${catId} ${Math.random()}`)
    })

    
  }


  return (
    <div>
      <span className="list-wrapper">
        {
          lista.map(cat => {
            return (
              <div className="list-cat" key={cat.id}>
                <div
                  id={cat.name}
                  className="list-cat-name"
                  onClick={(e) => handleClick(e)}>
                  {cat.name}
                </div>
                <div className="test-sub">{arrayLen = cat.subcategories.length}</div>
                {
                  (show && cat.name === id_value) ?
                    cat.subcategories.map((sub, i) => {
                      // se for o final do map, colocar o componente de
                      // adicionar subcategoria
                      if(i === (arrayLen -1)){
                        confirm = true
                      }
                      return (
                        <div key={sub.id}>
                        <div  className="sub-wrapper-area">
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
                        {
                        confirm ?
                        <div key={sub.id} className="sub-wrapper-area">
                          <span className="list-cat-add-sub" >
                            < FaPlusCircle />
                            <form onSubmit={(e) => handleClickAddSub(e, submitData, cat.id)}>
                            <input type='text' onChange={(e) => setSubmitData(e.target.value)} ></input>
                            </form>
                            (adicionar subcategoria)
                          </span>
                        </div>
                        :
                        ''

                        }
                        </div>
                      )
                    })
                    :
                    ''
                }
              </div>
            )
          })
        }
      </span>
    </div>
  )
}