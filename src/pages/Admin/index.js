
import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import {LoginContext} from '../../Contexts/LoginContext';


import api from "../../services/api";

import AdminDashboard from "../../components/AdminDashboard";
import Main from "./Main";
import "./styles.css";

import Cart from "../Cart";
import NewProduct from "../../components/NnEProduct";
import PersistentDrawerLeft from "../TestAdmin";
import AdminDashboard2 from "../TestAdmin";
import PendingOrders from "../PendingOrders";
import Orders from "../../components/Orders";

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
                                {/* <Main /> */}
                                <Route exact path={props.match.path} component={Main} />
                                {
                                  <Route
                                    path={`${props.match.path}/newproduct`}
                                    component={NewProduct}
                                  />                            
                                }
                                 {
                                   <Route
                                    path={`${props.match.path}/pendingorder`}
                                    component={Orders}
                                  />
                                 }
                              </AdminDashboard2>
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
