import React, { useState, useEffect } from 'react';

const LoginContext = React.createContext({});

function LoginContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState('admin');

  useEffect(() => {
    setUsername(localStorage.getItem('name'));
    setUserId(localStorage.getItem('userId'));
    setUserType(localStorage.getItem('userType'));
  }, [loggedIn]);

  const userInfo = {
    loggedIn: loggedIn,
    name: username,
    id: userId,
    type: userType,

    setLoggedIn: setLoggedIn,
    setName: setUsername,
    setId: setUserId,
    setType: setUserType,
  };

  return (
    <LoginContext.Provider value={userInfo}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;

export {LoginContext};