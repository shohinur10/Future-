import theme from "./app/MaterialTheme/index";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import {store} from "./store"
import { createRoot } from 'react-dom/client';
import ContextProvider from './app/components/context/ContextProvider';
import { BrowserRouter  as Router} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
       <ThemeProvider theme ={theme}> 
        <CssBaseline />
        <Router>
        <App />  
        </Router>
        </ThemeProvider>
      </ContextProvider>
     </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

