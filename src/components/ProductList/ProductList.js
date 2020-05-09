import React, { Component } from "react";
import ProductItem from "../ProductList/ProductItem";

import Row from "react-bootstrap/Row";

export default class ProductList extends Component {
	render() {
		const { products } = this.props;

		return (
			<Row className="product-row" noGutters={true}>
				{products.map((product, index) => (
					<ProductItem key={`product-${index}`} product={product} />
				))}
			</Row>
		);
	}
}
