import theme from "./app/MaterialTheme/index";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { createRoot } from 'react-dom/client';
import ContextProvider from './app/components/context/ContextProvider';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./app/components/context/SocketContext";
import App from "./app/App";

// Type assertion to fix React 18 + Redux Provider compatibility
const ReduxProvider = Provider as any;


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ContextProvider>
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </SocketProvider>
      </ContextProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

