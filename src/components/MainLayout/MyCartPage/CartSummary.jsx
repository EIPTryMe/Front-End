import React from "react";

import formatPrice from "../../../utils/formatPrice";

function CartSummary(props) {
	const { carts } = props;

	console.log('rerender summary');
	const subTotal = formatPrice(
		carts.reduce((sum, cart) => sum + cart.product.price_per_month * cart.quantity, 0)
	);
	const shipping = formatPrice(5);
	const total = formatPrice(+subTotal + +shipping);

	const MainContent = ({ colSpan }) => (
		<td colSpan={colSpan}>
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
	);

	return (
		<React.Fragment>
			<tr className="cart-summary-table-row d-none d-md-table-row">
				<td colSpan={2} className="no-border"></td>
				<MainContent colSpan={3} />
			</tr>
			<tr className="cart-summary-table-row d-none d-sm-table-row d-md-none">
				<td colSpan={1} className="no-border"></td>
				<MainContent colSpan={1} />
			</tr>
			<tr className="cart-summary-table-row d-table-row d-sm-none">
				<MainContent colSpan={2} />
			</tr>
		</React.Fragment>
	);
}

export default CartSummary;
