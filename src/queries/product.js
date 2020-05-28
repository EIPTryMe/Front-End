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
			picture {
				id
				url
			}
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

export const GET_COMPANY_PRODUCTS = gql`
	query Product($company_id: Int!) {
		product(where: {company_id: {_eq: $company_id}}) {
			id
			created_at
			brand
			name
			stock
			price_per_month
			picture {
				id
				url
			}
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
	mutation AddProduct($stock: Int!, $name: String!, $price_per_month: float8!, $company_id: Int) {
		createProduct(
			stock: $stock
			name: $name
			price_per_month: $price_per_month
			company_id: $company_id
		) {
			id
		}
	}
`;

export const PRODUCT_DELETE = gql`
	mutation DeleteProduct($product_id: Int!) {
		delete_product_by_pk(id: $product_id) {
			id
		}
	}
`;
