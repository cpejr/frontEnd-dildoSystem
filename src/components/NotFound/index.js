import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header';

const NotFound = () => (
    <>
        <Header />
        <div className="notFound">
            <div class='c'>
                <div class='_404'>404</div>
                <hr />
                <div class='_1'>NÃO ENCONTRADA</div>
                <div class='_2'>A página que você procura não foi encontrada.</div>
            </div>
        </div>
    </>
);

export default NotFound;