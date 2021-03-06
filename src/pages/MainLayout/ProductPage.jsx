import React, { useMemo, useEffect } from "react";
import Container from "react-bootstrap/Container";

import LoadingComponent from "../../components/LoadingComponent";
import ProductList from "../../components/MainLayout/ProductPage/ProductList";
import ProductFilters from "../../components/MainLayout/ProductPage/ProductFilters";

import { GET_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import { useProductFilter } from "../../hooks/productFilterHook";

const ProductPage = ({history}) => {
	const { filters, ...filterHandlers } = useProductFilter();
	const { loading: isLoadingProducts, error, data = { product: [] }, refetch } = useQuery(GET_PRODUCTS, {
		variables: { ...filters }
	});
	const products = useMemo(() => data.product, [data.product]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<div className="my-products">
			<div className="product-filters-container">
				<ProductFilters {...filterHandlers} />
			</div>
			<Container className="product-list-container">
				{isLoadingProducts && <LoadingComponent />}
				{!isLoadingProducts && !!error && handleHttpError(error)}
				{!isLoadingProducts && !error && products && <ProductList products={products} history={history}/>}
			</Container>
		</div>
	);
};

export default ProductPage;
