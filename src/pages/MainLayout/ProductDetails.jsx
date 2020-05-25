import React, { useMemo } from "react";
import Container from "react-bootstrap/Container";

import LoadingComponent from "../../components/LoadingComponent";
import ProductItemDetail from "../../components/MainLayout/ProductPage/ProductItemDetail";
import { GET_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import ProductFilters from "../../components/MainLayout/ProductPage/ProductFilters";

const MyProductDetailPage = ({history}) => {

    const { loading: isLoadingProducts, error, data = { product: [] } } = useQuery(GET_PRODUCTS);
    const products = useMemo(() => data.product, [data.product]);
    return (
        <div className="my-products container">
                {isLoadingProducts && <LoadingComponent />}
                {!isLoadingProducts && !!error && handleHttpError(error)}
                {!isLoadingProducts && !error && products && <ProductItemDetail products={history.location.state.product} />}
        </div>
    );
};

export default MyProductDetailPage;
