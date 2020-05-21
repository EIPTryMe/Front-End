import React from "react";

import HelmetComponent from "../components/HelmetComponent";

const CheckoutLayout = ({ title, children }) => {
	return (
		<>
			<HelmetComponent title={title} />
			<div className="content-wrapper">
				Checkout: {children}
			</div>
		</>
	);
};

export default CheckoutLayout;