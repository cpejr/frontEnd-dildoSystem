import React from 'react';

import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';


function App() {
  const theme = createMuiTheme({
    palette: { primary: { main: "#DAA621", contrastText: "#FFF" } }
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ ThemeProvider>
  );
}

export default App;
