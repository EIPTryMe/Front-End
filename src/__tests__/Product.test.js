import React from "react";
import ls from "../utils/testingLocalStorage";

//GRAPHQL
import { ApolloProvider } from "@apollo/react-hooks";
//GRAPHQL
import ProductList from "../components/ProductList/ProductList";
import renderer from "react-test-renderer";

import ProductItem from "../components/ProductList/ProductItem";

describe("Product", () => {
	beforeAll(() => {
		ls.setLocalStorage();
	});

	it("Can render a product list", () => {
		const products = JSON.parse(localStorage.getItem("products"));
		const client = localStorage.getItem("client");

		const component = renderer.create(
			<ApolloProvider client={client}>
				<ProductList products={products} />
			</ApolloProvider>
		);

		expect(component.toJSON()).toMatchSnapshot();
	});

    it("render the right number of product", () => {
		const products = JSON.parse(localStorage.getItem("products"));
		const client = localStorage.getItem("client");

		const component = renderer.create(
			<ApolloProvider client={client}>
				<ProductList products={products} />
			</ApolloProvider>
		);

		const root = component.root;

		const productItems = root.findAllByType(ProductItem);

        expect(productItems.length).toEqual(products.length);
	});

	it("Pass product prop to every products", () => {
		const products = JSON.parse(localStorage.getItem("products"));
		const client = localStorage.getItem("client");

		const component = renderer.create(
			<ApolloProvider client={client}>
				<ProductList products={products} />
			</ApolloProvider>
		);

		const root = component.root;

		const productItems = root.findAllByType(ProductItem);

		productItems.forEach((productItem) => {
            expect(productItem.props.product)
            .toBeDefined()
            .not.toBeNull();
		});
	});
});
