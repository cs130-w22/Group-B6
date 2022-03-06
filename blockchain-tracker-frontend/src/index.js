import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);