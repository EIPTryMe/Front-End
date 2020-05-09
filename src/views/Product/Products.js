import React from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Container from "react-bootstrap/Container";

import ProductList from "../../components/ProductList/ProductList";
import ProductFilters from "../../components/ProductFilters/ProductFilters";

import { GET_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";

const Products = () => {
	const { loading: isLoadingProducts, error, data } = useQuery(GET_PRODUCTS);

	if (isLoadingProducts) {
		return <LoadingScreen />;
	} else if (error) {
		return handleHttpError(error);
	}

	const products = data ? data.product : [];

	console.log(JSON.stringify(data, null, 4));

	return (
		<div className="my-products">
			<div className="product-filters-container">
				<ProductFilters />
			</div>
			<Container className="product-list-container">
				{!isLoadingProducts && products && <ProductList products={products} />}
			</Container>
		</div>
	);
};

export default Products;
