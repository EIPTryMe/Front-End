import React, { Component } from "react";

export default class ProductFilters extends Component {
	render() {
        const { children, title, titleClasses = [], inputClasses = [] } = this.props;

		return (
			<div className="filter-group">
				<div className={`filter-title ${titleClasses.join(' ')}`}>{title}</div>
				<div className={`filter-input ${inputClasses.join(' ')}`}>{children}</div>
			</div>
		);
	}
}
