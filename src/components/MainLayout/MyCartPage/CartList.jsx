import React, { useState, useCallback, useEffect } from "react";
import CartItem from "./CartList/CartItem";

import Table from "react-bootstrap/Table";

import CartSummary from "./CartSummary";

import { DEL_CART_ITEM } from "../../../queries/cart";
import { useMutation } from "@apollo/react-hooks";

import { NotificationManager } from "react-notifications";

import useAppContext from "../../../contexts/AppContext";

const MemoCartItem = React.memo(({ ...props }) => <CartItem {...props} />);

function buildDevCarts(carts) {
	return carts.map((cart) => {
		if (!cart.quantity) cart.quantity = 1 || Math.floor(Math.random() * 4) + 1;
		if (!cart.duration) cart.duration = 6;
		if (!cart.product.description)
			cart.product.description = '13.3" Display, Intel® i3-1000NG4 Processor, 8GB Memory, 256GB SSD Storage';
		return cart;
	});
}

function CartList(props) {
	const { carts, refetch } = props;
	const context = useAppContext();

	// todo remove for production
	const [devCarts, setDevCarts] = useState(buildDevCarts(carts));

	useEffect(() => {
		setDevCarts(buildDevCarts(carts));
	}, [carts]);

	const [deleteCartItem] = useMutation(DEL_CART_ITEM);

	const onDeleteCartItem = useCallback(
		(cart) => {
			const { id: cart_id } = cart;

			return deleteCartItem({
				variables: { cart_id },
			})
				.then(() => {
					context.changeParams({ cartLength: context.state.params.cartLength - 1 });
					refetch();
					NotificationManager.success(`${cart.product.name} x 1`, "Retiré du panier");
				})
				.catch((error) => {
					NotificationManager.warning(error.message, "Attention");
				});
		},
		[deleteCartItem, refetch, context.state.params]
	);

	return (
		<Table bordered responsive="md" variant="light" className="cart-list-table">
			<tbody>
				{devCarts.map((cart) => (
					<MemoCartItem
						cart={cart}
						key={`cart-${cart.id}`}
						onDeleteCartItem={onDeleteCartItem}
					/>
				))}
				<CartSummary carts={devCarts} />
			</tbody>
		</Table>
	);
}

export default CartList;
