import { gql } from "apollo-boost";

export const REVIEW_CREATE = gql`
	mutation createReview(
		$order_item_id: Int!
		$score: float8!
		$description: String!
		$product_id: Int!
		$user_id: Int
	) {
		insert_review_one(
			object: {
				order_item_id: $order_item_id
				score: $score
				description: $description
				product_id: $product_id
				user_id: $user_id
			}
		) {
			id
		}
	}
`;
