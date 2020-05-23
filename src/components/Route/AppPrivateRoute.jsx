import React, { useEffect, useState } from "react";

import AppRoute from "./AppRoute";

import { useAuth0 } from "../../hooks/auth0";
import useAppContext from "../../contexts/AppContext";

import LoadingComponent from "../../components/LoadingComponent";

const AppPrivateRoute = ({ component: Component, layout: Layout, title, ...rest }) => {
	const context = useAppContext();
	const { loading, isAuthenticated: isAuthByAuth0, user, loginWithRedirect } = useAuth0();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (context.state.user !== null) {
			setIsAuthenticated(true);
			return;
		}
		
		if (loading) return;

		if (isAuthByAuth0 === true) {
			context.setUser(user);
			setIsAuthenticated(true);
			return;
		}
		
		const fn = async () => {
			await loginWithRedirect({
				appState: { targetUrl: window.location.pathname },
			});
		};
		fn();
	}, [context, context.state.user, loading, isAuthByAuth0, user, loginWithRedirect]);

	if (isAuthenticated === true) {
		return <AppRoute component={Component} layout={Layout} title={title} {...rest} />;
	}

	return (
		<AppRoute
			component={LoadingComponent}
			layout={Layout}
			title={title}
			{...rest}
		/>
	);
};

export default AppPrivateRoute;
