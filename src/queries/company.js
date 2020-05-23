import { gql } from "apollo-boost";

export const COMPANY_GET_OPTIONS = gql`
	query getCompany {
		company {
			name
			id
		}
	}
`;