import React, { Component, useMemo } from "react";

import formatPrice from "../../utils/formatPrice";

export default class CartItem extends Component {
	render() {
		const { cart } = this.props;

		const price_per_month_formatted = formatPrice(cart.product.price_per_month);

        const imgs = [
			'https://via.placeholder.com/286x300/14213D/FFFFFF?text=Tryme+placeholder',
			'https://via.placeholder.com/286x300/FCA311/FFFFFF?text=Tryme+placeholder',
			'https://via.placeholder.com/286x300/000000/FFFFFF?text=Tryme+placeholder'
        ];
        
		return (
			<li className="items odd">
				<div className="infoWrap">
					<div className="cartSection">
						<img
							src={imgs[Math.floor(Math.random() * 3) ]}
							alt=""
							className="itemImg"
						/>
						<p className="itemNumber">ID: #{cart.product.id}</p>
						<h3>{cart.product.name}</h3>
						<p>
							<input type="text" className="qty" placeholder="1" /> x{" "}
							{price_per_month_formatted}€
						</p>
						<p className="stockStatus"> In Stock</p>
					</div>
					<div className="prodTotal cartSection">
						<p>{price_per_month_formatted}€</p>
					</div>
					<div className="cartSection removeWrap">
						<a href="/my-cart" className="remove">
							x
						</a>
					</div>
				</div>
			</li>
		);
	}
}
