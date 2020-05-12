import React, { Component } from "react";
import gear from "../../assets/img/gear.png";

export default class LoadingScreen extends Component {
	render() {
		return (
			<div className="loading-background">
				<img src={gear} className="loading-logo" alt="logo" />
				<p className="loading-text">
					Loading...
				</p>
			</div>
		);
	}
}
