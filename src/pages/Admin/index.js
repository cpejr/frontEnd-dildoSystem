import React, { useState } from 'react';

import api from '../../services/api';

import AdminDashboard from '../../components/AdminDashboard';
import './styles.css';

function Admin() {

    return (
        <AdminDashboard name="Nome do usuario" type="Tipo" />
    );
}
export default Admin;