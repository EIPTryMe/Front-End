import React from "react";
import LoadingComponent from "../../components/LoadingComponent";
import CartList from "../../components/MainLayout/MyCartPage/CartList";
import Container from "react-bootstrap/Container";

import { GET_CARTS } from "../../queries/cart";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import { ORDER_PAYMENT } from "../../queries/orders";
import { NotificationManager } from "react-notifications";

const MyCartPage = ({history}) => {
	const { loading: isLoadingCart, error, data } = useQuery(GET_CARTS);

	//PAYMENT
	const [orderPayment] = useMutation(ORDER_PAYMENT);
	const onCheckout = (e) => {
		e.preventDefault();

		history.push('/checkout/step-1');
		
		return ;
		orderPayment()
			.then(() => {
				NotificationManager.success(`Merci pour votre commande`, "Commande validée");
			})
			.catch(() => {
				NotificationManager.warning(error.message, "Attention");
			});
	};

	if (isLoadingCart) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	const carts = data ? data.cart : [];

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
				<a href="/" className="btn continue" onClick={onCheckout}>
					Checkout
				</a>
			</Container>
		</div>
	);
};

export default MyCartPage;
