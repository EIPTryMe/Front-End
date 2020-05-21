import React, { useEffect } from "react";
import { useAuth0 } from "../../hooks/auth0";
import LoadingComponent from "../../components/LoadingComponent";
import AppRoute from "./AppRoute";

const PrivateRoute = ({ component: Component, layout, title, path, ...rest }) => {
	const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

	useEffect(() => {
		if (loading || isAuthenticated) {
			return;
		}
		const fn = async () => {
			await loginWithRedirect({
				appState: { targetUrl: window.location.pathname },
			});
		};
		fn();
	}, [loading, isAuthenticated, loginWithRedirect, path]);

	return (
		<AppRoute
			path={path}
			component={isAuthenticated === true ? Component : LoadingComponent}
			layout={layout}
			title={title}
			{...rest}
		/>
	);
};

export default PrivateRoute;
