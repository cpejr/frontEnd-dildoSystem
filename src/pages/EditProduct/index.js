import React, {useState} from 'react'
import NnEProduct from '../../components/NnEProduct/index.js'
import AdminDashBoard from '../../components/AdminDashboard/index.js'
import ProductEditor from '../../components/ProductEditor/index.js'

import Products from '../../components/Products';

export default function EditProduct() {
    const [max_price, setMax_Price] = useState();
    const [min_price, setMin_Price] = useState();
    const [order_by, setOrder_by] = useState();
    const [order_ascending, setOrder_ascending] = useState();
    const [search, setSearch] = useState();
    const [subcategory_id, setSubcategory_id] = useState();

    return(
        <div>
            <Products filters = {{max_price, min_price, order_by, order_ascending, search, subcategory_id}}/>
        </div>
    )
}