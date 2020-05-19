import React from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CartList from "../../components/CartList/CartList";
import Container from "react-bootstrap/Container";

import { GET_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";

const Carts = () => {
	const { loading: isLoadingCart, error, data } = useQuery(GET_PRODUCTS);

	if (isLoadingCart) {
		return <LoadingScreen />;
	} else if (error) {
		return handleHttpError(error);
	}
	//<code>{JSON.stringify(data, null, 4)}</code>
	//const panier = data ? data.product : [];

	const carts = [
		{
			id: 102,
			product: {
				id: 12,
				name: "Iphone X",
				price_per_month: 99.99,
				brand: "Apple",
			},
		},
		{
			id: 103,
			product: {
				id: 13,
				name: "Ipad",
				price_per_month: 39.99,
				brand: "Apple",
			},
		},
		{
			id: 104,
			product: {
				id: 14,
				name: "Huawei P30 Pro",
				price_per_month: 89.99,
				brand: "Huawei",
			},
		},
	];

	return (
		<div className="my-cart">
			<Container className="title-container">
				<h1 className="title">Votre Panier</h1>
				<div>
					<a href="/Products" className="continue">
						Continue Shopping
					</a>
				</div>
			</Container>
			<Container className="cart-list-container">
				{!isLoadingCart && carts && <CartList carts={carts} />}
			</Container>
			<Container>
				<a href="/" className="btn continue">
					{" "}
					Checkout{" "}
				</a>
			</Container>
		</div>
	);
};

export default Carts;
