import React, { Component } from "react";

import formatPrice from "../../utils/formatPrice";

export default class CartSummary extends Component {
	render() {
		const { carts } = this.props;

		const subTotal = formatPrice(
			carts.reduce((sum, cart) => sum + cart.product.price_per_month * cart.quantity, 0)
		);
		const shipping = formatPrice(5);
		const total = formatPrice(+subTotal + +shipping);

		return (
			<React.Fragment>
				<tr className="cart-summary-table-row d-none d-md-table-row">
					<td colSpan={2} className="no-border"></td>
					<td colSpan={3}>
						<div className="cart-summary-row">
							<p className="title">Sous-total</p>
							<p className="value">{subTotal} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Frais de transport</p>
							<p className="value">{shipping} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Total</p>
							<p className="value">{total} €</p>
						</div>
					</td>
				</tr>
				<tr className="cart-summary-table-row d-none d-sm-table-row d-md-none">
					<td colSpan={1} className="no-border"></td>
					<td colSpan={1}>
						<div className="cart-summary-row">
							<p className="title">Sous-total</p>
							<p className="value">{subTotal} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Frais de transport</p>
							<p className="value">{shipping} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Total</p>
							<p className="value">{total} €</p>
						</div>
					</td>
				</tr>
				<tr className="cart-summary-table-row d-table-row d-sm-none">
					<td colSpan={2}>
						<div className="cart-summary-row">
							<p className="title">Sous-total</p>
							<p className="value">{subTotal} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Frais de transport</p>
							<p className="value">{shipping} €</p>
						</div>
						<div className="cart-summary-row">
							<p className="title">Total</p>
							<p className="value">{total} €</p>
						</div>
					</td>
				</tr>
			</React.Fragment>
		);
	}
}
