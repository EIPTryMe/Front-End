import React from "react";
import ProductItemDetail from "./ProductList/ProductItemDetail";

import Row from "react-bootstrap/Row";

function ProductList(props) {
    const { products , history} = props;

    return (
                <ProductItemDetail key={`product-${products.id}`} product={products} history={history}/>
    );
}

export default ProductList;
