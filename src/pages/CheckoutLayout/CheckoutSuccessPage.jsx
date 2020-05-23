import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CheckoutSuccessPage = () => {
	return (
		<Container className="checkout-success">
			<h1 className="main-title text-success">Commande et paiement validés !</h1>
			<Button type="button" variant="success" href="/products">Continuer mes achats</Button>
		</Container>
	);
};

export default CheckoutSuccessPage;
