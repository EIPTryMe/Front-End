import React, {useMemo} from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Container from "react-bootstrap/Container";

import ProductList from "../../components/ProductList/ProductList";
import ProductFilters from "../../components/ProductFilters/ProductFilters";

import { GET_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import { useProductFilter } from "../../hooks/productFilterHook";

const Products = () => {
	const { filters, ...filterHandlers } = useProductFilter();
	const { loading: isLoadingProducts, error, data = {product: []} } = useQuery(GET_PRODUCTS, {variables: {...filters}});
	const products = useMemo(() => data.product, [data.product]);

	return (
		<div className="my-products">
			<div className="product-filters-container">
				<ProductFilters {...filterHandlers} />
			</div>
			<Container className="product-list-container">
				{isLoadingProducts && <LoadingScreen />}
				{!isLoadingProducts && error && handleHttpError(error)}
				{!isLoadingProducts && !error && products && <ProductList products={products} />}
			</Container>
		</div>
	);
};

export default Products;
