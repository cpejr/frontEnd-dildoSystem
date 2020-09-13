
import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { LoginContext } from '../../Contexts/LoginContext';


import api from "../../services/api";

import Main from "./Main";
import "./styles.css";

import NnEProduct from "../../components/NnEProduct";
import ProductEditor from "../../components/ProductEditor"
import EditProduct from "../../pages/EditProduct";
import AdminDashboard2 from "../TestAdmin";
import Orders from "../../components/Orders";
import PendingUsers from '../../components/PendingUsers';
import Products from '../../components/Products/index.js'

function Admin(props) {

  let [nome, setNome] = useState('Nome do usuario');
  let [type, setType] = useState('Tipo');

  const history = useHistory();

  
  return (
    <LoginContext.Consumer>
      {
        value => {
          if (value.type === 'admin') {
            return (
              <div>
                <AdminDashboard2 name={value.name} type={value.type}>

                  <Route exact path={props.match.path} component={Main} />

                  <Route
                    path={`${props.match.path}/newproduct`}
                    component={NnEProduct}
                  />

                   <Route
                    path={`${props.match.path}/editproduct/:id`}
                    component={ProductEditor}
                  />

                   <Route
                    path={`${props.match.path}/editproduct`}
                    component={EditProduct}
                  /> 

                  <Route
                    path={`${props.match.path}/pendingorder/:id`}
                    component={Orders}
                  />


                  <Route
                    path={`${props.match.path}/pendingusers`}
                    component={PendingUsers}
                  />

                </AdminDashboard2>

 {/*                <Route
                    path={`${props.match.path}/pendingorder`}
                    component={Orders}
                  /> */}
              </div>
            );
          } else {
            history.push('/');
          }
        }

      }
    </LoginContext.Consumer>

  );


}

export default Admin;
