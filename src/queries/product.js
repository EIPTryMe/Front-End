import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
    query Product(
        $order_by: [product_order_by!]
        $where: product_bool_exp
        ) {
        product(
            order_by: $order_by
            where: $where
            ) {
            id
			brand
			name
			price_per_day
			price_per_month
			price_per_week
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
