import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import NewProduct from './pages/NewProduct'
import PersistentDrawerLeft from './pages/TestAdmin';
import Main from './pages/Admin/Main';
import LoginContextProvider from './Contexts/LoginContext';
import PendingOrders from './pages/PendingOrders';
import EditProducts from './pages/EditProduct'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <LoginContextProvider>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/products' exact component={Dashboard} />
                    <Route path='/newproducts' exact component={NewProduct} />
                    <Route path='/editproducts' exact component={EditProducts} />
                    <Route path='/pendingorders' exact component ={PendingOrders} />
                    <Route path='/cart' exact component={Cart} />
                    <Route path="/testadmin" component={() => <PersistentDrawerLeft><Main /><Main /><Main /><Main /><Main /></PersistentDrawerLeft>} />
                </LoginContextProvider>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;