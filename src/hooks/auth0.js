// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER_INFO } from "../queries/user";
import useAppContext from "../contexts/AppContext";

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
	children,
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState();
	const [user, setUser] = useState();
	const [auth0Client, setAuth0] = useState();
	const [loading, setLoading] = useState(true);
	const [popupOpen, setPopupOpen] = useState(false);

	const [shouldExecute, executeQuery] = useState(false);
	const { loading: loadingApollo, data: userInfos } = useQuery(USER_INFO, {
		skip: !shouldExecute,
	});

	const history = useHistory();
	const context = useAppContext();

	useEffect(() => {
		if (loadingApollo) return;

		const initAuth0 = async () => {
			const auth0FromHook = await createAuth0Client(initOptions);
			setAuth0(auth0FromHook);

			if (
				window.location.search.includes("code=") &&
				window.location.search.includes("state=")
			) {
				const { appState } = await auth0FromHook.handleRedirectCallback();
				onRedirectCallback(appState, history);
			}

			const isAuthenticated = await auth0FromHook.isAuthenticated();

			setIsAuthenticated(isAuthenticated);

			if (isAuthenticated) {
				const user = await auth0FromHook.getUser();
				setUser(user);

				const { __raw: token } = await auth0FromHook.getIdTokenClaims();
				localStorage.setItem("token", token);

				executeQuery(true);
			}

			setLoading(false);
		};
		initAuth0();
		// eslint-disable-next-line
	}, [loadingApollo]);

	useEffect(() => {
		if (!userInfos || !user) return;
		const { user: userInfo } = userInfos;
		if (userInfo && Array.isArray(userInfo) && userInfo.length > 0) {
			console.log('ici');

			const builtUser = {
				picture: user.picture,
				uid: user.sub,
				firstname: userInfo[0].first_name,
				email: userInfo[0].email,
				name: userInfo[0].name,
				phone: userInfo[0].phone,
				address: userInfo[0].address,
				company: userInfo[0].company
			};
			context.setUser(builtUser);
			context.changeParams({cartLength: userInfo[0].cartsUid.length});
			setLoading(false);
		}
	}, [userInfos, user]);

	const loginWithPopup = async (params = {}) => {
		setPopupOpen(true);
		try {
			await auth0Client.loginWithPopup(params);
		} catch (error) {
			console.error(error);
		} finally {
			setPopupOpen(false);
		}
		const user = await auth0Client.getUser();
		setUser(user);
		setIsAuthenticated(true);

		const { __raw: token } = await auth0Client.getIdTokenClaims();
		localStorage.setItem("token", token);
		executeQuery(true);
	};

	const handleRedirectCallback = async () => {
		setLoading(true);
		await auth0Client.handleRedirectCallback();
		const user = await auth0Client.getUser();
		setLoading(false);
		setIsAuthenticated(true);
		setUser(user);

		const { __raw: token } = await auth0Client.getIdTokenClaims();
		localStorage.setItem("token", token);
		executeQuery(true);
	};
	return (
		<Auth0Context.Provider
			value={{
				isAuthenticated,
				user,
				loading,
				popupOpen,
				loginWithPopup,
				handleRedirectCallback,
				getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
				loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
				getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
				getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
				logout: (...p) => {
					localStorage.removeItem("token");

					return auth0Client.logout(...p);
				},
			}}
		>
			{children}
		</Auth0Context.Provider>
	);
};
