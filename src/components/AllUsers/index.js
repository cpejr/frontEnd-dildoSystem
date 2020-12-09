import React, { useState } from "react";
import { useTableSearch } from "./useTableSearch";
import { Input } from "antd";

import api from "../../services/api";

import "./styles.css";
import TodosUsuarios from "./TodosUsuarios.js"

const { Search } = Input;

const fetchUsers = async () => {
  const { data } = await api.get("users", {
    headers: {
      authorization: "Bearer " + localStorage.accessToken,
    },
  });
  
  return { data };
};


export default function AllUsers() {
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [searchVal, setSearchVal] = useState(null);
  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  return (
    <div className="pending-users-container">
      <h4>Todos os Usuários</h4>
      <div className="pending-users-content">
        <Search
          className="search-users"
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Buscar usuário..."
          enterButton
        />
        {filteredData.map((todosUsuarios, index) => (
          <TodosUsuarios
            key={`pendingusers-${index}`}
            todosUsuarios={todosUsuarios}
          />
        ))}
      </div>
    </div>
  );
}