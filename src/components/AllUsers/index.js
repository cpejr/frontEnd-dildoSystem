import React, { useState, useEffect } from "react";

import api from "../../services/api";

import "./styles.css";
import TodosUsuarios from "./TodosUsuarios.js"


export default function AllUsers() {
  const [todosUsuarios, setTodosUsuarios] = useState([]);

  useEffect(() => {
    api
      .get("users", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTodosUsuarios(response.data);
        console.log(todosUsuarios);
      });
  }, []);

  return (
    <div className="pending-users-container">
      <h4>Todos os Usuários</h4>
      <div className="pending-users-content">
        {todosUsuarios.map((todosUsuarios, index) => (
          <TodosUsuarios
            key={`pendingusers-${index}`}
            todosUsuarios={todosUsuarios}
          />
        ))}
      </div>
    </div>
  );
}