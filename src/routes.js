import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import NewProduct from './pages/NewProduct'

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/admin' exact component={Admin} />
                <Route path='/products' exact component={Dashboard} />
                <Route path='/newproducts' exact component={NewProduct} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;