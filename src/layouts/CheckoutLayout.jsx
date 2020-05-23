import React from "react";

import HelmetComponent from "../components/HelmetComponent";

const CheckoutLayout = ({ title, children }) => {
	return (
		<>
			<HelmetComponent title={title} />
			<div className="layout checkout-layout">
				{children}
			</div>
		</>
	);
};

export default CheckoutLayout;