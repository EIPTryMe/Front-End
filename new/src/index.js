import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/default.scss";
import "./assets/css/loading.css";

//LOGIN AUTH0
import { Auth0Provider } from "./hooks/auth0";
import { config, onRedirectCallback } from "./constants/auth0";
//LOGIN AUTH0

//GRAPHQL
import { client } from "./constants/graphql";
import { ApolloProvider } from "@apollo/react-hooks";
//GRAPHQL

ReactDOM.render(
	<Provider store={store}>
		<Auth0Provider
			domain={config.domain}
			client_id={config.clientId}
			redirect_uri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Auth0Provider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
