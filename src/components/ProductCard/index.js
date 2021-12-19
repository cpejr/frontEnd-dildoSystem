import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import NewProductCard from "./NewProductCard";

import "./styles.css";

export default withRouter((props) => {
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [triggerRequest, setTriggerRequest] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const bottomOfListRef = useRef(null);

  function getQueryParamsObj() {
    let queryParamsStr = props.location.search;
    queryParamsStr = queryParamsStr.substring(1);

    let queryParamsObj = {};
    const pairs = queryParamsStr.split("&");
    pairs.forEach((pair) => {
      const [key, val] = pair.split("=");
      queryParamsObj[key] = val;
    });
    return queryParamsObj;
  }

  function getAndSetData(params) {
    setLoading(true);
    api
      .get("/products", {
        params,
      })
      .then((response) => {
        if (response.data.length === 0) return setHasMoreItems(false);
        setProducts((oldProds) => {
          if (oldProds.length === 0) return response.data;
          else return [...oldProds, ...response.data];
        });
      })
      .finally(() => {
        setIsFirstRequest(false);
        setLoading(false);
        setPage((oldPage) => oldPage + 1);
      });
  }

  useEffect(() => {
    function handleScroll() {
      if (!bottomOfListRef.current) return;
      const isInBottomOfPage =
        window.innerHeight + window.scrollY >=
        bottomOfListRef.current.offsetTop;

      const shouldMakeNewRequest = isInBottomOfPage && !loading && hasMoreItems;

      if (shouldMakeNewRequest) {
        setTriggerRequest((old) => !old);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const queryParams = getQueryParamsObj();
    const params = { page, ...queryParams };
    if (props.releaseOnly) params.release = true;
    if (props.best_sellerOnly) params.best_seller = true;

    if (hasMoreItems && !loading && !isFirstRequest) {
      getAndSetData(params);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRequest]);

  useEffect(() => {
    if (!loading) {
      const queryParams = getQueryParamsObj();
      const params = { page: 1, ...queryParams };
      setProducts([]);
      getAndSetData(params);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search, props.best_sellerOnly, props.releaseOnly]);

  return (
    <div className={`products-container-wrapper ${props.className}`}>
      <div className="products-container">
        {products.length > 0 ? (
          <div className="products-container">
            {products.map((product, index) => {
              return <NewProductCard product={product} key={index} />;
            })}
            <div ref={bottomOfListRef}></div>
          </div>
        ) : (
          <div className="no-found-search">
            <h4>NENHUM RESULTADO ENCONTRADO</h4>
            <h6>Encontramos 0 resultado para sua busca </h6>
            <p className="no-found-paragraph">Dicas para melhorar sua busca </p>
            <p> - Verifique se não houve erro de digitação. </p>
            <p> - Procure por um termo similar ou sinônimo. </p>
            <p>
              {" "}
              - Tente procurar termos mais gerais e filtrar o resultado da
              busca.{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
