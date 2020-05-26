import { gql } from "apollo-boost";

export const USER_INFO = gql`
	query user_info {
		user {
			address
			name
			id
			first_name
			email
			phone
			company {
				id
				name
				email
				phone
				address
				siret
				siren
			}
			cartsUid {
				id
			}
		}
	}
`;

export const USER_UPDATE = gql`
	mutation user_update(
		$first_name: String!
		$name: String!
		$email: String!
		$address: String!
		$phone: String!
		$company_id: Int
		$uid: String!
	) {
		update_user(
			_set: {
				first_name: $first_name
				name: $name
				email: $email
				address: $address
				phone: $phone
				company_id: $company_id
			}
			where: { uid: { _eq: $uid } }
		) {
			returning {
				address
				name
				id
				first_name
				email
				phone
				company {
					id
					name
					email
					phone
					address
					siret
					siren
				}
				cartsUid {
					id
				}
			}
		}
	}
`;
