import React from 'react';

import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

function App() {
  const theme = createMuiTheme({
    palette: { primary: { main: "#F9CE56", contrastText: "#FFF" } }
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <LoginContextProvider> */}
      <Routes />
      {/* </LoginContextProvider> */}
    </ ThemeProvider>
  );
}

export default App;
