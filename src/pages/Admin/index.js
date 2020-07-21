import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import {LoginContext} from '../../Contexts/LoginContext';

import api from '../../services/api';

import AdminDashboard from '../../components/AdminDashboard';
import Main from './Main';
import './styles.css';
import Cart from '../Cart';



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
                            <div className="admin-page">
                                <div>
                                    <AdminDashboard name={value.name} type={value.type} />
                                    <div className="admin-content">
                                        <Route exact path={props.match.path} component={Main} />
                                        <Route path={`${props.match.path}/cart`} component={Cart} /> 
                                    </div>

                                </div>
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