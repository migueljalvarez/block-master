import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import App from "./components/App";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import config from "./config/config";
const { app } = config();

document.getElementById("title").innerHTML = app.projectName;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
