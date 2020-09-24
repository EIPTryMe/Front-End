import React, { useEffect, useMemo } from "react";
import { useAuth0 } from "../../hooks/auth0";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";

import { GET_ORDER_DELIVERY } from "../../queries/orders";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import GoogleMapReact from "google-map-react";

import { MarkerClass } from "./TrackDeliveryPage.module.scss";

const TrackDeliveryPage = ({ history, match }) => {
	const { loading: isLoadingAuth } = useAuth0();

	const orderId = match.params.order_id;

	const { loading: isLoadingOrderInfo, error, data, refetch } = useQuery(GET_ORDER_DELIVERY, {
		variables: { order_id: orderId },
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const orderDelivery = useMemo(() => {
		if (!isLoadingOrderInfo && data) {
			console.log(data);
			return data.order_delivery[0];
		}
		return null;
	}, [isLoadingOrderInfo, data]);

	if (isLoadingAuth || isLoadingOrderInfo) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	const MyMarker = ({ text, ...rest }) => <span {...rest}>{text}</span>;

	return (
		<Container className="my-orders">
			<h1>Suivre mon colis</h1>
			{orderDelivery && orderDelivery.lat && orderDelivery.lng && (
				<div style={{ height: "500px", width: "100%" }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: "AIzaSyC2SY_6CY2ITb8qCv_O_RgtMJRx3Bgd4lc" }}
						defaultCenter={{ lat: orderDelivery.lat, lng: orderDelivery.lng }}
						defaultZoom={11}
					>
						<MyMarker
							lat={orderDelivery.lat}
							lng={orderDelivery.lng}
							text="ici"
							className={MarkerClass}
						/>
					</GoogleMapReact>
				</div>
			)}
			{orderDelivery && (!orderDelivery.lat || !orderDelivery.lng) && <p>Votre colis ne peut pas être tracé, nous n'avons pas encore reçu les coordonnées de la part du livreur</p>} 
			{!isLoadingOrderInfo && !orderDelivery && <p>Votre colis ne peut pas être tracé</p>} 
		</Container>
	);
};

export default TrackDeliveryPage;
