import { gql } from "apollo-boost";

export const SUGGESTIONS_GET = gql`
	query getMySuggestions {
		suggestion {
			id
			product {
				id
				created_at
				brand
				name
				stock
				description
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
				reviews_aggregate {
					aggregate {
						avg {
							score
						}
						count
					}
				}
				reviews {
					score
					description
					created_at
				}
			}
		}
	}
`;
