import React, { Component } from "react";
import logo from "../../assets/img/logo-react.svg";
import "../../assets/css/loading.css";

export default class LoadingScreen extends Component {
	render() {
		return (
			<div className="loading-background">
				<img src={logo} className="loading-logo" alt="logo" />
				<p className="loading-text">
					Loading...
				</p>
			</div>
		);
	}
}
