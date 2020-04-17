import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
//LOGIN MODAL CSS
import "./assets/css/login.css";

//LOGIN AUTH0
import { Auth0Provider } from "./hooks/auth0";
import history from "./utils/history";
const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};
const config = {
	domain: "YOUR_DOMAIN",
	clientId: "YOUR_CLIENT_ID",
};
//LOGIN AUTH0

ReactDOM.render(
	<Provider store={store}>
		<Auth0Provider
			domain={config.domain}
			client_id={config.clientId}
			redirect_uri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			<App />
		</Auth0Provider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
