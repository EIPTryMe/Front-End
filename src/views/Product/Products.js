import React from "react";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Container from "react-bootstrap/Container";

import ProductList from '../../components/ProductList/ProductList';
import "./products.scss";
import { GET_PRODUCTS } from '../../queries/product';
import { useQuery } from '@apollo/react-hooks';
import { handleHttpError } from "../../utils/errorHandler";


const Products = () => {
    const { loading: isLoadingProducts, error, data } = useQuery(GET_PRODUCTS);

    if (isLoadingProducts) {
        return <LoadingScreen/>;
    } else if (error) {
        return handleHttpError(error);
    }
    //<code>{JSON.stringify(data, null, 4)}</code>
    const products = data ? data.product : [];
    return (
        <Container className="my-products">
            {!isLoadingProducts && products && <ProductList products={products} />}

            {console.log(JSON.stringify(data, null, 4))}
        </Container>
    );
};

export default Products;
