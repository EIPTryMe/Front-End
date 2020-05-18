import ApolloClient from "apollo-boost";

async function onRequest(operation) {
	const token = localStorage.getItem("token");

	const context = operation.getContext();

	if (!context.headers) {
		context.headers = {};
	}

	if (!context.headers.Authorization && token) {
		context.headers.Authorization = `Bearer ${token}`;
	}

	operation.setContext(context);
	
	// operation.setContext({
	// 	headers: {
	// 		"x-hasura-admin-secret": "aUCyUfhw8eNxR35se7IzQ4D1yEQvB8vu",
	// 	},
	// });
}

export const client = new ApolloClient({
	uri: "https://tryme-backend.herokuapp.com/v1/graphql",
	request: onRequest,
});
