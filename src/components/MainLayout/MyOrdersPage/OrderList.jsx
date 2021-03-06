import React, { Component } from "react";
import OrderItem from "./OrderList/OrderItem";
import Table from "react-bootstrap/Table";

export default class OrderList extends Component {
	render() {
		const { orders, history } = this.props;

		return (
			<div className="w-100">
				<Table striped bordered hover responsive="lg" variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Adresse facturation</th>
							<th>Produits</th>
						</tr>
					</thead>
				</Table>
				{orders.map((order) => (
					<OrderItem key={`order-${order.id}`} order={order} history={history} />
				))}
			</div>
		);
	}
}
