import React, { Component } from "react";

export default class Order extends Component {
	render() {
		const { order } = this.props;

		const created_at = new Date(order.created_at);

        const formattedAddress = `${order.address_line_1}, ${order.address_city} ${order.address_postal_code}, ${order.address_country}`;
        
        const products = order.order_items.map((orderItem) => {
            return orderItem.product.name + ' - ' + orderItem.price + '€';
        });

		return (
			<tr>
				<td>{order.id}</td>
				<td>{order.status}</td>
				<td>{created_at.toLocaleString()}</td>
				<td>{formattedAddress}</td>
                <td>{products.map((text, index) => <p key={"text-order" + order.id + index}>{text}</p>)}</td>
			</tr>
		);
	}
}
