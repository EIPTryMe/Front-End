import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import ProductDetailsComponent from "../../components/MainLayout/ProductDetailsPage/ProductDetailsComponent";
import { NavLink } from "react-router-dom";

const ProductDetailsPage = ({ location, ...props }) => {
	const state = location.state;
	const product = state ? state.product : null;

	const { history } = props;

	return (
		<div className="my-products">
			<Container className="product-detail">
				<Button variant="info" className="mt-4 mb-4" to="/products" as={NavLink}>Retour à la liste des produits</Button>

				<ProductDetailsComponent product={product} history={history} />
			</Container>
		</div>
	);
};

export default ProductDetailsPage;
