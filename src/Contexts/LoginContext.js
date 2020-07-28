import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import useStateWithPromise from './useStateWithPromise';

import api from '../services/api';

const LoginContext = React.createContext({});

function LoginContextProvider(props) {
  const [loggedIn, setLoggedIn] = useStateWithPromise(false);
  const [username, setUsername] = useStateWithPromise('');
  const [userId, setUserId] = useStateWithPromise(0);
  const [userType, setUserType] = useStateWithPromise('retailer');
  const [accessToken, setAccessToken] = useStateWithPromise('');

  const history = useHistory();
  const [changed, setChanged] = useState(false);
  const [location, setLocation] = useState(history.location.pathname);

  useEffect(() => {
    if (changed) {
      history.push(location);
      setChanged(false);
    }
  }, [changed])

  useEffect(() => {
    const newToken = localStorage.getItem('accessToken');
    if (newToken && !accessToken) {
      async function grabData() {
        const config = {
          headers: { authorization: `Bearer ${newToken}` }
        }

        const resp = await api.get('verify', config);

        if (resp.data.verified) {
          await Promise.all([
            setUsername(resp.data.user.user.name),
            setUserId(resp.data.user.user.id),
            setUserType(resp.data.user.user.type),
            setLoggedIn(true)
          ]);
          console.log('verified')
          setChanged(true);
        } else {
          await Promise.all([
            setUsername(''),
            setUserId(0),
            setUserType('retailer'),
            setLoggedIn(false),
          ]);
          setChanged(true);
        }
      }
      grabData();
    }
  }, [])

  // const [tokenChanged, setTokenChanged] = useState(false);
  // const [dataChanged, setDataChanged] = useState(false);

  // useEffect(() => {
  //   if (tokenChanged) {

  //     setTokenChanged(false);
  //   }
  // }, [tokenChanged]);

  // useEffect(() => {
  //   if (dataChanged) {

  //     setDataChanged(false);
  //   }
  // }, [dataChanged]);

  // async function setNewToken() {
  //   await setAccessToken(localStorage.getItem('accessToken'));
  //   setTokenChanged(true);
  // }

  // async function handleLogin() {
  //   try {
  //     //await setAccessToken(localStorage.getItem('accessToken'));

  //     console.log(accessToken);

  //     const config = {
  //       headers: { authorization: `Bearer ${accessToken}` }
  //     }

  //     const resp = await api.get('verify', config);

  //     if (resp.data.verified) {
  //       await Promise.all([
  //         setUsername(resp.data.user.user.name),
  //         setUserId(resp.data.user.user.id),
  //         setUserType(resp.data.user.user.type),
  //         setLoggedIn(true)
  //       ]);
  //       //setDataChanged(true);
  //     } else {
  //       await Promise.all([
  //         setUsername(''),
  //         setUserId(0),
  //         setUserType('retailer'),
  //         setLoggedIn(false),
  //       ]);
  //       //setDataChanged(true);
  //     }

  //     console.log("userType");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
    // handleLogin: handleLogin,
    // setNewToken: setNewToken
  };

  return (
    <LoginContext.Provider value={userInfo}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;

export { LoginContext };