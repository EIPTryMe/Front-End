import React, { useState, useCallback, useMemo } from "react";

import formatPrice from "../../../../utils/formatPrice";

function CartItem({ cart, onDeleteCartItem }) {
	const [disabled, setDisabled] = useState(false);

	const unit_price_per_month_formatted = formatPrice(cart.product.price_per_month);
	const total_price_per_month_formatted = formatPrice(
		cart.quantity * cart.product.price_per_month
	);

	const imgs = [
		"https://via.placeholder.com/286x300/14213D/FFFFFF?text=Tryme+placeholder",
		"https://via.placeholder.com/286x300/FCA311/FFFFFF?text=Tryme+placeholder",
		"https://via.placeholder.com/286x300/000000/FFFFFF?text=Tryme+placeholder",
	];

	const randomImg = useMemo(() => {
		return imgs[Math.floor(Math.random() * 3)];
	}, []);

	const onBeforeDeleteCartItem = useCallback(
		(cart) => {
			if (disabled) return;
			setDisabled(true);
			onDeleteCartItem(cart)
			.then(() => {
				setDisabled(false);
			})
			.catch(() => {
				setDisabled(false);
			});
		},
		[disabled, onDeleteCartItem]
	);

	return (
		<React.Fragment>
			{/* DESKTOP */}
			<tr className="cart-item d-none d-md-table-row">
				<td>
					<div className="cart-item-img-container">
						<img src={cart.product.picture ? cart.product.picture.url : randomImg} alt="" className="cart-item-img" />
					</div>
				</td>
				<td>
					<div className="cart-item-description-container">
						<h3 className="cart-item-name">{cart.product.name}</h3>
						<p className="cart-item-description">
							{cart.product.description}
						</p>
						{/* <p className="cart-item-stock">stock</p> */}
						<p className="cart-item-reference">ID Produit: #{cart.product.id}</p>
					</div>
				</td>
				<td>
					<div className="cart-item-unit-price-container">
						<h3 className="cart-item-unit-price">Prix</h3>
						<p className="cart-item-unit-price-value">
							{unit_price_per_month_formatted} €/mois
						</p>
					</div>
				</td>
				<td>
					<div className="cart-item-quantity-container">
						<h3 className="cart-item-quantity">Quantité</h3>
						<div className="cart-item-quantity-modifier">
							<button type="button" className="cart-item-quantity-modifier-btn">
								-
							</button>
							<p className="cart-item-quantity-value">{cart.quantity}</p>
							<button type="button" className="cart-item-quantity-modifier-btn">
								+
							</button>
						</div>
						{!disabled && (
							<p className="cart-remove" onClick={() => onBeforeDeleteCartItem(cart)}>
								Retirer du panier
							</p>
						)}
					</div>
				</td>
				<td>
					<div className="cart-item-total-price-container">
						<h3 className="cart-item-total-price">Prix total</h3>
						<p className="cart-item-total-price-value">
							{total_price_per_month_formatted} €/mois
						</p>
						<p className="cart-item-duration">Pour {cart.duration} Mois</p>
					</div>
				</td>
			</tr>
			{/* MOBILE */}
			<tr className="cart-item d-table-row d-md-none">
				<td>
					<div className="cart-item-img-container">
						<img src={randomImg} alt="" className="cart-item-img" />
					</div>
				</td>
				<td>
					<div className="cart-item-description-container">
						<h3 className="cart-item-name">{cart.product.name}</h3>
						<p className="cart-item-description">
							{cart.product.description}
						</p>
						{/* <p className="cart-item-stock">stock</p> */}
						{/* <p className="cart-item-reference">ID Produit: #{cart.product.id}</p> */}
					</div>
					<div className="cart-item-unit-price-container cart-item-total-price-container">
						<div className="d-flex flex-row align-items-center">
							<h3 className="cart-item-unit-price mr-1">Prix : </h3>
							<p className="cart-item-unit-price-value">
								{unit_price_per_month_formatted} €/mois
							</p>
						</div>
						<p className="cart-item-duration">pour {cart.duration} Mois</p>
					</div>
					<div className="cart-item-quantity-container">
						<h3 className="cart-item-quantity">Quantité</h3>
						<div className="cart-item-quantity-modifier">
							<button type="button" className="cart-item-quantity-modifier-btn">
								-
							</button>
							<p className="cart-item-quantity-value">{cart.quantity}</p>
							<button type="button" className="cart-item-quantity-modifier-btn">
								+
							</button>
						</div>
					</div>
					{!disabled && (
						<p className="cart-remove" onClick={() => onBeforeDeleteCartItem(cart)}>
							Retirer du panier
						</p>
					)}
				</td>
			</tr>
		</React.Fragment>
	);
}
export default CartItem;
