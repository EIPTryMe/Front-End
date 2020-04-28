import { gql } from 'apollo-boost';

export const GET_ORDERS = gql`
	{
		command {
			id
			status
			updated_at
			created_at
		}
	}
`;

export const ADD_ORDER = gql`
	mutation addNewCommand {
		insert_command(objects: { status: "awaiting for payement" }) {
			returning {
				created_at
				id
				status
				updated_at
			}
		}
	}
`;

export const UPDATE_ORDER = gql`
	mutation updateCommandById {
		update_command(where: { id: { _eq: 1 } }, _set: { status: "Delivered" }) {
			returning {
				updated_at
				status
				id
				created_at
			}
		}
	}
`;

export const DELETE_ORDER = gql`
	mutation updateCommandById {
		delete_command(where: { id: { _eq: 2 } }) {
			affected_rows
		}
	}
`;
