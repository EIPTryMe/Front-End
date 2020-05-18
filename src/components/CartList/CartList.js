import React, { Component } from "react";
import CartItem from "./CartItem";

import Table from "react-bootstrap/Table";

import CartSummary from "./CartSummary";

export default class CartList extends Component {
	render() {
		const { carts } = this.props;

		// todo remove for production
		const newC = carts.map((cart) => {
			if (!cart.quantity) cart.quantity = Math.floor(Math.random() * 4) + 1;
			if (!cart.duration) cart.duration = 6;
			if (!cart.product.product_descriptions)
				cart.product.product_descriptions = [
					{
						name:
							'13.3" Display, Intel® i3-1000NG4 Processor, 8GB Memory, 256GB SSD Storage',
					},
				];
			return cart;
		});

		return (
			<Table bordered responsive="md" variant="light" className="cart-list-table">
				<tbody>
					{/* todo edit newC */}
					{newC.map((cart) => (
						<CartItem cart={cart} key={`cart-${cart.id}`} />
					))}
					<CartSummary carts={newC} />
				</tbody>
			</Table>
		);
	}
}
