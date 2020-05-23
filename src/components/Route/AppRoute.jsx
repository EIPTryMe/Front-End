import React from "react";
import { Route } from "react-router-dom";

const AppRoute = ({ component: Component, layout: Layout, title, ...rest }) => {
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
