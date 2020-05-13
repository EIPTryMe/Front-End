import {gql} from "apollo-boost";


export const ADD_TO_CART = gql`
	mutation CreateCartItem($product_id: Int!) {
        createCartItem(product_id: $product_id) {
            id
        }
    }
`;

export const GET_CART = gql`
	query getAllCart ($user_id: Int!) {
        cart(where: {user_id: {_eq: $user_id }}) {
            id
            product_id
            user_id
  }
}
`;
