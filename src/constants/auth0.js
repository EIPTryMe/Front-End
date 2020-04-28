import history from "../utils/history";

export const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

export const config = {
	domain: "dev-2o6a8byc.eu.auth0.com",
	clientId: "YIfBoxMsxuVG6iTGNlxX3g7lvecyzrVQ",
};