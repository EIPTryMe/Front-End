import React from "react";
import ProductItem from "../ProductList/ProductItem";

import Row from "react-bootstrap/Row";

function ProductList(props) {
	const { products } = props;

	return (
		<Row noGutters={true}>
			{products.map((product, index) => (
				<ProductItem key={`product-${product.id}`} product={product} />
			))}
		</Row>
	);
}

export default ProductList;