import React from "react";
import { useAuth0 } from "../../hooks/auth0";

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Container from "react-bootstrap/Container";
import OrderList from '../../components/OrderList/OrderList';

import { GET_ORDERS } from '../../queries/orders';
import { useQuery } from '@apollo/react-hooks';
import { handleHttpError } from "../../utils/errorHandler";


const Orders = () => {
	const { loading: isLoadingAuth, user } = useAuth0();
	const { loading: isLoadingOrders, error, data } = useQuery(GET_ORDERS);

	if (isLoadingAuth || isLoadingOrders) {
		return <LoadingScreen/>;
	} else if (error) {
		return handleHttpError(error);
	}

	//todo remove for prod FOR TESTING
	user.company = {
		name: "EIP",
		siret: "000198765467",
		address: "123 rue test",
		phone: "+33612345678",
	};

	const orders = data ? data.order : [];

	return (
		<Container className="my-orders">
			<h1>Mes commandes</h1>
		
			{!isLoadingOrders && orders && <OrderList orders={orders} />}
	
			{user.company && <React.Fragment></React.Fragment>}

			<code>{JSON.stringify(data, null, 4)}</code>
			{console.log(JSON.stringify(data, null, 4))}
		</Container>
	);
};

export default Orders;
