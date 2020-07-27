import React, { useState, useEffect } from 'react';

import api from '../services/api';

const LoginContext = React.createContext({});

function LoginContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState('retailer');
  const [accessToken, setAccessToken] = useState('');

  async function handleLogin() {
    try {
      //setAccessToken(localStorage.getItem('accessToken'));
      //console.log(accessToken);
      const config = {
        headers: { authorization: `Bearer ${accessToken}` }
      }

      const resp = await api.get('verify', config);

      if(resp.data.verified) {
        await Promise.all([
        setUsername(resp.data.user.user.name),
        setUserId(resp.data.user.user.id),
        setUserType(resp.data.user.user.type),
        setLoggedIn(true)
        ]);
      } else {
        setUsername('');
        setUserId(0);
        setUserType('retailer');
        setLoggedIn(false);
      }

      console.log("userType");
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => { 
  //   console.log(accessToken);
  // }, [accessToken]);

  const userInfo = {
    loggedIn: loggedIn,
    name: username,
    id: userId,
    type: userType,
    accessToken: accessToken,

    setLoggedIn: setLoggedIn,
    setName: setUsername,
    setId: setUserId,
    setType: setUserType,
    setAccessToken: setAccessToken,
    handleLogin: handleLogin
  };

  return (
    <LoginContext.Provider value={userInfo}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;

export {LoginContext};