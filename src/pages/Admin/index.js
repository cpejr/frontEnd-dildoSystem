import React, { useState } from "react";
import { Route } from "react-router-dom";

import api from "../../services/api";

import AdminDashboard from "../../components/AdminDashboard";
import Main from "./Main";
import "./styles.css";

import Cart from "../Cart";
import NewProduct from "../../components/NnEProduct";
import PersistentDrawerLeft from "../TestAdmin";
import AdminDashboard2 from "../TestAdmin";

function Admin(props) {
  let [nome, setNome] = useState("Nome do usuario");
  let [type, setType] = useState("Tipo");

  return (
    <div className="admin-page">
      {
        <div>
          <AdminDashboard2 name={nome} type={type}>
            {/* <Main /> */}
            <Route exact path={props.match.path} component={Main} />
            {
              <Route
                path={`${props.match.path}/newproduct`}
                component={NewProduct}
              />
            }
          </AdminDashboard2>
        </div>
      }
      {/* <PersistentDrawerLeft>
                <Main />
            </PersistentDrawerLeft> */}
    </div>
  );
}

export default Admin;
