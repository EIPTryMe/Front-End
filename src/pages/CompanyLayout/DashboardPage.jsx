import React from "react";
import { useAuth0 } from "../../hooks/auth0";
import { NavLink } from "react-router-dom";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const DashboardPage = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <LoadingComponent />;
	}

	return (
		<Container className="company-dashboard">
			<h1>Tableau de bord de mon entreprise</h1>
			<Button variant="success" size="lg" as={NavLink} to={'/company/add_product'}>Mettre un produit en vente</Button>
			<Button variant="success" size="lg" className="mt-3" as={NavLink} to={'/company/sales'}>Afficher mes ventes</Button>
		</Container>
	);
};

export default DashboardPage;
