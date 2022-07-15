import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/globalStyles.css";
import UseAuth from "./aboutFirebase/UseAuth";

ReactDOM.render(
	<React.StrictMode>
		<UseAuth>
			<App />
		</UseAuth>
	</React.StrictMode>,
	document.getElementById("root"),
);
