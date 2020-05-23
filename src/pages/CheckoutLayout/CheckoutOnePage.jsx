import React from "react";

import Container from "react-bootstrap/Container";

import AddressFormComponent from "../../components/CheckoutLayout/AddressFormComponent.jsx";

const CheckoutOnePage = ({history}) => {
	return (
		<Container className="checkout-one">
			<h1 className="main-title">Etape de paiement : 1 / 3</h1>
			<AddressFormComponent title="Adresse de facturation:" history={history} />
		</Container>
	);
};

export default CheckoutOnePage;
