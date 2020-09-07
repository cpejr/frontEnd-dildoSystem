import React from 'react'
import AdminDashBoard from '../../components/AdminDashboard/index.js'
import ProductEditor from '../../components/ProductEditor/index.js'

export default function EditProduct() {
    return(
        <div>
            < AdminDashBoard />
            <ProductEditor wichOne={'editar'} />
        </div>
    )
}