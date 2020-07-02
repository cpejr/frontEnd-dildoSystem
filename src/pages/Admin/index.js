import React, { useState } from 'react';

import api from '../../services/api';
import Footer from '../../components/Footer';
import AdminDashboard from '../../components/AdminDashboard';
import './styles.css';

function Admin() {
    let [nome, setNome] = useState('Nome do usuario');
    let [type, setType] = useState('Tipo');

    return (
        <div>
            <AdminDashboard name={nome} type={type} />
            <div className="admin-content">
                
            </div>
            <Footer />
        </div>
    );
}

export default Admin;