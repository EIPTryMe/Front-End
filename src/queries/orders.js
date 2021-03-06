import { gql } from "apollo-boost";

export const GET_ORDERS = gql`
	{
		order {
			id
			created_at
			address_postal_code
			address_line_1
			address_country
			address_city
			order_items {
				id
				price
				product {
					brand
					id
					name
					price_per_month
				}
				review {
					description
				}
			}
			order_deliveries {
				delivery_status
				lat
				lng
			}
		}
	}
`;

export const GET_COMPANY_ORDERS = gql`
	query getMyCompanyOrders($company_id: Int!) {
		order(where: { order_items: { product: { company_id: { _eq: $company_id } } } }) {
			id
			created_at
			address_postal_code
			address_line_1
			address_country
			address_city
			order_items(where: { product: { company_id: { _eq: $company_id } } }) {
				id
				price
				product {
					brand
					id
					name
					price_per_month
				}
			}
		}
	}
`;

export const ADD_ORDER = gql`
	mutation addNewCommand {
		insert_command(objects: { status: "awaiting for payement" }) {
			returning {
				created_at
				id
				status
				updated_at
			}
		}
	}
`;

export const ORDER_PAYMENT = gql`
	mutation orderPayment($city: String!, $country: String!, $line1: String!, $postalCode: Int!) {
		orderPayment(
			addressDetails: {
				address_city: $city
				address_country: $country
				address_line_1: $line1
				address_postal_code: $postalCode
			}
			currency: "EUR"
		) {
			order_id
			clientSecret
			publishableKey
		}
	}
`;

export const PAY_ORDER = gql`
	mutation payOrder($order_id: Int!) {
		payOrder(order_id: $order_id) {
			order_id
			status
			stripe_id
		}
	}
`;

export const GET_ORDER_DELIVERY = gql`
	query getOrderDelivery($order_id: Int!) {
		order_delivery(where: { order_id: { _eq: $order_id } }) {
			lat
			lng
		}
	}
`;
