import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./globalStyles.css";
import UserContext from "./AboutFirebase/UseAuth";

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
