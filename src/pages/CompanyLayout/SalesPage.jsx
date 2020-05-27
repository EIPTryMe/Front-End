import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../hooks/auth0";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import OrderList from '../../components/MainLayout/MyOrdersPage/OrderList';

import LoadingComponent from "../../components/LoadingComponent";

import { useQuery } from "@apollo/react-hooks";
import { GET_SALES_ORDERS } from "../../queries/orders";
import { handleHttpError } from "../../utils/errorHandler";
import { NavLink } from "react-router-dom";

import useAppContext from "../../contexts/AppContext";

const SalesPage = () => {
	const { loading: isLoadingAuth } = useAuth0();
	const context = useAppContext();
	const user = context.state ? context.state.user : null;

	const [shouldExecute, executeQuery] = useState(false);
	const { loading: isLoadingOrders, error, data } = useQuery(GET_SALES_ORDERS, {
		skip: !shouldExecute,
		variables: {company_id: user && user.company ? user.company.id : null},
		context: {headers: {"x-hasura-admin-secret": "aUCyUfhw8eNxR35se7IzQ4D1yEQvB8vu"}}
	});

	useEffect(() => {
		if (isLoadingAuth || isLoadingOrders || !user || !user.company) return;
		executeQuery(true);
	}, [isLoadingAuth, isLoadingOrders, user]);

	// useEffect(() => {
	// refetch();
	// }, [refetch]);

	if (isLoadingAuth || isLoadingOrders) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	const orders = data ? data.order : [];

	return (
		<Container className="company-sales">
			<Button variant="info" size="sm" as={NavLink} to={"/company/dashboard"}>
				Retourner au tableau de bord
			</Button>
			<h1>Mes ventes:</h1>
			{!isLoadingOrders && orders && <OrderList orders={orders} />}
		</Container>
	);
};

export default SalesPage;
