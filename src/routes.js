import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import LoginContextProvider from './Contexts/LoginContext';
import SearchContextProvider from './Contexts/SearchContext';
import CartContextProvider from './Contexts/CartContext'
import User from './pages/User';
import ForgottenPassword from './pages/ForgottenPassword';
import ProductPage from './pages/ProductPage';
import Frete from './components/Frete';
import Addresses from './pages/Addresses';
import TermsandConditions from './pages/TermsandConditions'
import NotFound from './components/NotFound'
import About from './pages/About'
import Checkout from './pages/checkoutPage'
import CatNSubCat from './pages/CategoriasESubcategorias'
import Insta from './components/Instagram'

function Routes() {
    return (
        <BrowserRouter>
            <CartContextProvider>
                <LoginContextProvider>
                    <SearchContextProvider>
                        <Switch>
                            <Route path='/' exact component={Dashboard} />
                            <Route path='/search' component={Search} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/forgottenPassword' exact component={ForgottenPassword} />
                            <Route path='/register' exact component={Register} />
                            <Route path='/admin' component={Admin} />
                            <Route path='/cart' exact component={Cart} />
                            <Route path='/user' component={User} />
                            <Route path='/product/:id' component={ProductPage} />
                            <Route path='/testefrete' component={Frete} />
                            <Route path='/addresses' component={Addresses} />
                            <Route path='/about' component={About} />
                            <Route path='/conditions' component={TermsandConditions} />
                            <Route path='/checkout/:order_id' component={Checkout} />
                            <Route path='/insta' component={Insta} />
                            <Route exact={true} component={NotFound} />
                        </Switch>
                    </SearchContextProvider>
                </LoginContextProvider>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default Routes; 