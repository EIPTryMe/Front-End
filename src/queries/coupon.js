import { gql } from "apollo-boost";

export const TEST_PROMO = gql`
	query validateCoupon($code: String!) {
		validateCoupon(code: $code) {
			valid
			discountedPrice
			discountValue
		}
	}
`;
