import React, { Component } from "react";
import CartItem from "./CartItem";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import formatPrice from "../../utils/formatPrice";

export default class CartList extends Component {
	render() {
		const { carts } = this.props;

		const subTotal = formatPrice(carts.reduce((sum, cart) => sum + cart.product.price_per_month, 0));
		const shipping = formatPrice(5);
		const total = formatPrice(+subTotal + +shipping);

		return (
			<div className="cart">
				<div className="wrap cf">
					<div className="heading cf">
						<h1>Votre Panier</h1>
						<a href="/Products" className="continue">
							Continue Shopping
						</a>
					</div>
				</div>
				<Container>
					<Row>
						{carts.map((cart) => (
							<CartItem cart={cart} key={`cart-${cart.id}`} />
						))}
					</Row>
					<Row>
						<Col>
							<Table responsive>
								<tbody>
									<tr>
										<td>Sous-total</td>
										<td className="text-right">{subTotal} €</td>
									</tr>
									<tr>
										<td>Frais de transport</td>
										<td className="text-right">{shipping} €</td>
									</tr>
									<tr>
										<td>Total</td>
										<td className="text-right">{total} €</td>
									</tr>
								</tbody>
							</Table>
							<a href="/" className="btn continue">
								{" "}
								Checkout{" "}
							</a>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
