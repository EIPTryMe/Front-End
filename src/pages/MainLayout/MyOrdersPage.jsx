import React, { useEffect } from "react";
import { useAuth0 } from "../../hooks/auth0";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";
import OrderList from "../../components/MainLayout/MyOrdersPage/OrderList";

import { GET_ORDERS } from "../../queries/orders";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";

const MyOrdersPage = ({ history }) => {
	const { loading: isLoadingAuth } = useAuth0();
	const { loading: isLoadingOrders, error, data, refetch } = useQuery(GET_ORDERS);

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoadingAuth || isLoadingOrders) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	const orders = data ? data.order : [];

	return (
		<Container className="my-orders">
			<h1>Mes commandes</h1>

			{!isLoadingOrders && orders && <OrderList orders={orders} history={history} />}
		</Container>
	);
};

export default MyOrdersPage;
