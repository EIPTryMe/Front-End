import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
	query Product($order_by: [product_order_by!], $where: product_bool_exp) {
		product(order_by: $order_by, where: $where) {
			id
			created_at
			brand
			name
			stock
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
`;

export const PRODUCT_ADD = gql`
	mutation AddProduct($stock: Int!, $name: String!, $price_per_month: float8!) {
		createProduct(stock: $stock, name: $name, price_per_month: $price_per_month) {
			id
		}
	}
`;
