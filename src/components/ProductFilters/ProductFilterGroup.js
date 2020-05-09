import React, { Component } from "react";

export default class ProductFilters extends Component {
	render() {
        const { children, title, titleClasses = [], inputClasses = [] } = this.props;

		return (
			<div className="filter-group">
				<div className={["filter-title", ...titleClasses]}>{title}</div>
				<div className={["filter-input", ...inputClasses]}>{children}</div>
			</div>
		);
	}
}
