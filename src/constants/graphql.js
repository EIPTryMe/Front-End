import ApolloClient from "apollo-boost";

async function onRequest(operation) {
	const token = localStorage.getItem('token');

	if (token) {
		operation.setContext({
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
			},
		});
	} else {
		operation.setContext({
			headers: {
				'x-hasura-admin-secret': 'aUCyUfhw8eNxR35se7IzQ4D1yEQvB8vu'
			}
		})
	}
}

export const client = new ApolloClient({
	uri: "https://tryme-backend.herokuapp.com/v1/graphql",
	request: onRequest
});
