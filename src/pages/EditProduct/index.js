import React from 'react'
import NnEProduct from '../../components/NnEProduct/index.js'
import AdminDashBoard from '../../components/AdminDashboard/index.js'

export default function EditProduct() {
    return(
        <div>
            < AdminDashBoard />
            <NnEProduct wichOne={'editar'} />
        </div>
    )
}