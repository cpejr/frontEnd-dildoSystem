import React from 'react';

import './global.css';

import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';


function App() {
  const theme = createMuiTheme({
    palette: { primary: { main: "#DAA621", contrastText: "#FFF" }}
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap" rel="stylesheet" />
    </ ThemeProvider>
  );
}

export default App;
