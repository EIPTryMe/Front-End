import { gql } from "apollo-boost";

export const ADD_TO_CART = gql`
	mutation CreateCartItem($product_id: Int!) {
        createCartItem(product_id: $product_id) {
            id
        }
    }
`;
