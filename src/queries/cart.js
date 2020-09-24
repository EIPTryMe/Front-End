import { gql } from "apollo-boost";

export const ADD_TO_CART = gql`
	mutation CreateCartItem($product_id: Int!) {
		createCartItem(product_id: $product_id) {
			id
		}
	}
`;

export const DEL_CART_ITEM = gql`
	mutation DeleteCartItem($cart_id: Int!) {
		delete_cart(where: {id: {_eq: $cart_id}}) {
			affected_rows
		}
	}
`;

export const GET_CARTS = gql`
	query getAllCart {
		cart {
			id
			promo {
				id
				code
				discount_value
				expiry_date
				remaining_count
			}
			product {
				id
				brand
				name
				description
				picture {
					id
					url
				}
				price_per_month
				product_descriptions {
					id
					name
				}
				product_specifications {
					name
					id
				}
			}
		}
	}
`;
