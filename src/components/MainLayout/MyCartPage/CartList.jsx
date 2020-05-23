import React, { useState, useCallback } from "react";
import CartItem from "./CartList/CartItem";

import Table from "react-bootstrap/Table";

import CartSummary from "./CartSummary";

import { DEL_CART_ITEM } from "../../../queries/cart";
import { useMutation } from "@apollo/react-hooks";

import { NotificationManager } from "react-notifications";

const MemoCartItem = React.memo(({...props}) => <CartItem {...props}/>);

function CartList(props) {
	const { carts } = props;

	// todo remove for production
	const [devCarts, setDevCarts] = useState(
		carts.map((cart) => {
			if (!cart.quantity) cart.quantity = 1 || Math.floor(Math.random() * 4) + 1;
			if (!cart.duration) cart.duration = 6;
			if (
				!cart.product.product_descriptions ||
				cart.product.product_descriptions.length === 0
			)
				cart.product.product_descriptions = [
					{
						name:
							'13.3" Display, Intel® i3-1000NG4 Processor, 8GB Memory, 256GB SSD Storage',
					},
				];
			return cart;
		})
	);

	const [deleteCartItem] = useMutation(DEL_CART_ITEM);


	const onDeleteCartItem = useCallback((cart) => {
		const { id: cart_id } = cart;

		deleteCartItem({
			variables: { cart_id },
		})
			.then(() => {
				setDevCarts((devCarts) => devCarts.filter((d) => d.id !== cart_id));
				NotificationManager.success(`${cart.product.name} x 1`, "Retiré du panier");
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
			
	}, [deleteCartItem]);

	return (
		<Table bordered responsive="md" variant="light" className="cart-list-table">
			<tbody>
				{devCarts.map((cart) => (
					<MemoCartItem cart={cart} key={`cart-${cart.id}`} onDeleteCartItem={onDeleteCartItem} />
				))}
				<CartSummary carts={devCarts} />
			</tbody>
		</Table>
	);
}

export default CartList;
