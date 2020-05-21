import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

const AppRoute = ({ component: Component, layout: Layout, private: isPrivate, title, ...rest }) => {
	if (isPrivate) {
		return (
			<PrivateRoute component={Component} layout={Layout} title={title} {...rest} />
		);
	}
	return (
		<Route
			{...rest}
			render={(props) => (
				<Layout title={title}>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
};

export default AppRoute;
