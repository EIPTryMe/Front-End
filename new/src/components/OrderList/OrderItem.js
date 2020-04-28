import React, { Component } from "react";

export default class Order extends Component {
	render() {
		const { order } = this.props;

        const created_at = new Date(order.created_at);
        const updated_at = new Date(order.updated_at);
		return (
			<tr key={"order-" + order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{created_at.toLocaleString()}</td>
                <td>{updated_at.toLocaleString()}</td>
            </tr>
		);
	}
}
