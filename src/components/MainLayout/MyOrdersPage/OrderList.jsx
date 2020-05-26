import React, { Component } from "react";
import OrderItem from "./OrderList/OrderItem";
import Table from "react-bootstrap/Table";

export default class OrderList extends Component {
	render() {
		const { orders } = this.props;

		return (
			<div>
				<Table striped bordered hover responsive="lg" variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Adresse facturation</th>
							<th>Produits</th>
						</tr>
					</thead>
				</Table>
				{orders.map((order, index) => (
					<OrderItem key={`order-${order.id}`} order={order} />
				))}
			</div>
		);
	}
}
