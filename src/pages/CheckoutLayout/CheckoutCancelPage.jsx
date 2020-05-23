import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CheckoutCancelPage = () => {
	return (
		<Container className="checkout-cancel">
			<h1 className="main-title text-warning">Commande et paiement annulés!</h1>
			<Button type="button" variant="success" href="/products">Reprendre mes achats</Button>
		</Container>
	);
};

export default CheckoutCancelPage;
