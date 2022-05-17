import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./globalStyles.css";
import UseAuth from "./AboutFirebase/UseAuth";

ReactDOM.render(
  <React.StrictMode>
    <UseAuth>
      <App />
    </UseAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
