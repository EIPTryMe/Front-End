import React from "react";
import gear from "../assets/img/gear.png";

const LoadingComponent = () => {
	return (
		<div className="loading-background">
			<img src={gear} className="loading-logo" alt="logo" />
			<p className="loading-text">Loading...</p>
		</div>
	);
};

export default LoadingComponent;
