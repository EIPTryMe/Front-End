import React, { useEffect } from "react";
import { useAuth0 } from "../../hooks/auth0";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import LoadingComponent from "../../components/LoadingComponent";

import { useQuery } from '@apollo/react-hooks';
import { GET_SALES_ORDERS } from '../../queries/orders';
import { handleHttpError } from "../../utils/errorHandler";
import { NavLink } from "react-router-dom";


const SalesPage = () => {
	const { loading: isLoadingAuth } = useAuth0();
	const { loading: isLoadingOrders, error, data, refetch } = useQuery(GET_SALES_ORDERS);

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoadingAuth || isLoadingOrders) {
		return <LoadingComponent/>;
	} else if (error) {
		return handleHttpError(error);
	}

	const orders = data ? data.order : [];

	return (
		<Container className="company-sales">
			<h1>Mes ventes:</h1>
			<Alert variant="info">En cours de développement.</Alert>
			<Button variant="info" size="sm" as={NavLink} to={'/company/dashboard'}>Retourner au tableau de bord</Button>

		</Container>
	);
};

export default SalesPage;
