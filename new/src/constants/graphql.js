import ApolloClient from "apollo-boost";

async function onRequest(operation) {
	const token = localStorage.getItem('token');

	operation.setContext({
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
}

export const client = new ApolloClient({
	uri: "https://tryme-backend.herokuapp.com/v1/graphql",
	request: onRequest
});
