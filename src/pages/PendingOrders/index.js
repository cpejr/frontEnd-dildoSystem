import React from 'react';
import AdminDashboard from '../../components/AdminDashboard/index.js';
import Orders from '../../components/Orders';
import './styles.css';

export default function PendingOrders() {
  return (
    <div>
      <AdminDashboard />
      <Orders />
    </div>
  );
}
