import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./App";
import "../src/core/i18n/i18n";
import "./assets/styles/index.css";
import store from "./core/redux/store";
import { StyledToastContainer } from "./components/ui/ToastContainer";

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <StyledToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
);

render(application, document.getElementById("root"));
