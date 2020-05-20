import React, { Component } from "react";

import OrderItem from "./OrderItem";
import Table from "react-bootstrap/Table";


export default class OrderList extends Component {
	render() {
		const { orders } = this.props;

		return (
			<Table striped bordered hover responsive="lg" variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Status</th>
						<th>Date de création</th>
						<th>Adresse facturation</th>
						<th>Produits</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => (
						<OrderItem key={`order-${order.id}`} order={order} />
					))}
				</tbody>
			</Table>
		);
	}
}
