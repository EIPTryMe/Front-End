import React, { useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import CartList from "../../components/MainLayout/MyCartPage/CartList";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from 'react-router-dom'

import { GET_CARTS } from "../../queries/cart";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";

import Alert from "react-bootstrap/Alert";

const MyCartPage = ({history}) => {
	const { loading: isLoadingCart, error, data, refetch } = useQuery(GET_CARTS);
	const [carts, setCarts] = useState([]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		setCarts(data ? data.cart : []);
	}, [data]);

	const onCheckout = (e) => {
		e.preventDefault();

		history.push('/checkout/step-1');
	};

	console.log(carts);

	if (isLoadingCart) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	return (
		<div className="my-cart">
			<Container className="title-container">
				<h1 className="title">Votre Panier</h1>
				{carts.length > 0 && 
				<div>
					<a href="/checkout/step-1" className="continue">
						Valider mon panier
					</a>
				</div>}
			</Container>
			<Container className="cart-list-container">
				{!isLoadingCart && carts && carts.length > 0 && <CartList carts={carts} refetch={refetch} />}
				{!isLoadingCart && carts && carts.length === 0 && 
					<>
						<Alert variant="info">Votre panier est vide.</Alert>
						<Button variant="success" className="goToShop" as={NavLink} to="/products">Reprendre mes achats</Button>
					</>
				}
			</Container>
			<Container className="text-right px-0">
				{carts.length > 0 && 
				<a href="/checkout/step-1" className="continue" onClick={onCheckout}>
					Valider mon panier
				</a>}
			</Container>
		</div>
	);
};

export default MyCartPage;
