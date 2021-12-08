import React from 'react';

import './styles.css';

import Header from '../Header';

const NotFound = function () {
  return (
    <>
      <Header />
      <div className="notFound">
        <div className="c">
          <div className="_404">404</div>
          <hr />
          <div className="_1">NÃO ENCONTRADA</div>
          <div className="_2">A página que você procura não foi encontrada.</div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
