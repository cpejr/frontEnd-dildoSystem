import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import NewProduct from './pages/NewProduct'


function Routes() {
    return(  
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/admin' component={Admin} />
                <Route path='/products' exact component={Dashboard} />
                <Route path='/newproducts' exact component={NewProduct} />
                <Route path='/cart' exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;