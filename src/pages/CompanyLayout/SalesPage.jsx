import React from "react";
import { useAuth0 } from "../../hooks/auth0";
import { NavLink } from "react-router-dom";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const SalesPage = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <LoadingComponent />;
	}

	return (
		<Container className="company-sales">
			<h1>Mes ventes:</h1>
			<Alert variant="info">En cours de développement.</Alert>
			<Button variant="info" size="sm" as={NavLink} to={'/company/dashboard'}>Retourner au tableau de bord</Button>
		</Container>
	);
};

export default SalesPage;
