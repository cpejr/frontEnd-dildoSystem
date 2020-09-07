import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import LoginContextProvider from './Contexts/LoginContext';
import User from './pages/User';
import ForgottenPassword from './pages/ForgottenPassword';
import ProductPage from './pages/ProductPage';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <LoginContextProvider>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/search' exact component={Search} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/forgottenPassword' exact component={ForgottenPassword} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/cart' exact component={Cart} />
                    <Route path='/user' component={User} />
                    <Route path='/product/:id' component={ProductPage}/>
                </LoginContextProvider>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes; 