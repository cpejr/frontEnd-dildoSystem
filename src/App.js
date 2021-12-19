import React from "react";

import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Routes from "./routes";

const App = function () {
  const theme = createMuiTheme({
    palette: { primary: { main: "#F9CE56", contrastText: "#FFF" } },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
