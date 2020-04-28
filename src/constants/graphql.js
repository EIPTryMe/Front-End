import ApolloClient from "apollo-boost";

function onRequest(operation) {
}

export const client = new ApolloClient({
    uri: "https://tryme-backend.herokuapp.com/v1/graphql",
    request: onRequest,
    headers: {
        "x-hasura-admin-secret": "aUCyUfhw8eNxR35se7IzQ4D1yEQvB8vu",
    }
});
