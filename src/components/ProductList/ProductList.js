import React, { Component } from "react";
import ProductItem from "../ProductList/ProductItem";

export default class ProductList extends Component {
    render() {
        const { products } = this.props;
        return (
            <div>
                {
                    products.map((product) => (
                        <article className="thumb">
                            <ProductItem product={product} />
                        </article>
                    ))
                }
            </div>
        );
    }
}
