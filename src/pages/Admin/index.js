import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import api from '../../services/api';

import AdminDashboard from '../../components/AdminDashboard';
import Main from './Main';
import './styles.css';
import Cart from '../Cart';



function Admin(props) {
    let [nome, setNome] = useState('Nome do usuario');
    let [type, setType] = useState('Tipo');

    return (
        <div className="admin-page">

            <div>
                <AdminDashboard name={nome} type={type} />
                <div className="admin-content">
                    {/* <Main /> */}
                    <Route exact path={props.match.path} component={Main} />
                    <Route path={`${props.match.path}/cart`} component={Cart} />
                </div>

            </div>
        </div>
    );
}

export default Admin;