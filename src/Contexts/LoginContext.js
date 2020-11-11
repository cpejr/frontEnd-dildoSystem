import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import useStateWithPromise from "./useStateWithPromise";

import api from "../services/api";

const LoginContext = React.createContext({});

function LoginContextProvider(props) {
  const [loggedIn, setLoggedIn] = useStateWithPromise(false);
  const [username, setUsername] = useStateWithPromise("");
  const [userId, setUserId] = useStateWithPromise(0);
  const [userType, setUserType] = useStateWithPromise("retailer");
  const [accessToken, setAccessToken] = useStateWithPromise("");
  const [email, setEmail] = useStateWithPromise("");
  const [phonenumber, setPhonenumber] = useStateWithPromise(0);

  const history = useHistory();
  const [changed, setChanged] = useState(false);
  const [location] = useState(history.location)

  useEffect(() => {
    if (changed) {
      history.push(location.pathname+location.search);
      setChanged(false);
    }
  }, [changed]);

  useEffect(() => {
    const newToken = localStorage.getItem("accessToken");
    if (newToken && !accessToken) {
      async function grabData() {
        const config = {
          headers: { authorization: `Bearer ${newToken}` },
        };
        const resp = await api.get("verify", config);

        if (resp.data.verified) {
          const userType = (resp.data.user.type === "wholesaler" && resp.data.user.user_status !== "approved") ? "retailer" : resp.data.user.type;   
          await Promise.all([
            setUsername(resp.data.user.name),
            setUserId(resp.data.user.id),
            setUserType(userType),
            setLoggedIn(true),
            setAccessToken(newToken),
            setEmail(resp.data.user.email),
            setPhonenumber(resp.data.user.phonenumber)
          ]);
          setChanged(true);
        } else {
          await Promise.all([
            setUsername(""),
            setUserId(0),
            setUserType("retailer"),
            setLoggedIn(false),
            setAccessToken(""),
            setEmail(""),
            setPhonenumber(0)
          ]);
          setChanged(true);
        }
      }
      grabData();
    }
  }, []);

  function handleLogout() {
    setLoggedIn(false);
    setAccessToken('');
    localStorage.removeItem("accessToken");
    api.defaults.headers.authorization = undefined;
    history.push("/login");
  }

  const userInfo = {
    loggedIn: loggedIn,
    name: username,
    id: userId,
    type: userType,
    accessToken: accessToken, 
    email: email,
    phone: phonenumber,

    setLoggedIn: setLoggedIn,
    setName: setUsername,
    setId: setUserId,
    setType: setUserType,
    setAccessToken: setAccessToken,
    handleLogout
  };

  return (
    <LoginContext.Provider value={userInfo}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;

export { LoginContext };
