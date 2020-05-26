// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import ls from "./utils/testingLocalStorage";
import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

ls.setLocalStorage();

const TOKEN =
	"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImV3cXJSU0J6Sm5aZjBBOGlBMWxfSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJjb21wYW55Il0sIngtaGFzdXJhLXVzZXItaWQiOiJhdXRoMHw1ZWI0ZDEyMTNiMTBkNjBjMDE1ZmQ4NjcifSwibmlja25hbWUiOiJ0aGliYXV0IiwibmFtZSI6InRoaWJhdXRAdGVzdC5mcmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvN2M3NWE2ZDAzNTM0MDZiZDNiOTc4MDQ1ZjRkMjJhNGY_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0aC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNS0xN1QxOTowMzoxNy4zNzVaIiwiZW1haWwiOiJ0aGliYXV0QHRlc3QuZnJhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi0ybzZhOGJ5Yy5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWViNGQxMjEzYjEwZDYwYzAxNWZkODY3IiwiYXVkIjoiWUlmQm94TXN4dVZHNmlUR05seFgzZzdsdmVjeXpyVlEiLCJpYXQiOjE1ODk3NzMwMzcsImV4cCI6MTU4OTgwOTAzNywibm9uY2UiOiJNM0E1VXpGR05WTXpNMmhtUldocFkyaDRNRlpsV1dGRWNXWnlOemhVYW5WZlYxWjBTaTQ0WDJzNFlRPT0ifQ.f9N6iMtzilGUbX5vUARkdB-BTKZi76ToCt1W-dN0y8amxPwl1e_HSSeUyEbpMlAMWyJrhfS-z2JNV7qZnhOSap-A1A5SER69K7JjKALKofsgfq5I81ykzyyH3iO9xBJk3k_ODD6S1_1HlnOKzc8UqAWOOgZhcVOP07p_NSp8_NFzT9SwGEQ_MNBKRCxhhgWVGHPC0UIncg1UD6K9tvzEOJSyOdmjJtfmty48ICY0mq1aCNreGGX8adWLFL2xSHjX3gbql5-XAQOQwvTrAI27csn3GyDcuMzJvLDXwFna-q1bbEDNsGFPmTEEGAidrR7v1Nc-ERH-n2vSJUIXftF6Xw";

const fakeUser = {
	"https://hasura.io/jwt/claims": {
		"x-hasura-default-role": "user",
		"x-hasura-allowed-roles": ["user", "company"],
		"x-hasura-user-id": "auth0|5eb4d1213b10d60c015fd867",
	},
	nickname: "thibaut",
	name: "Thibaut T.",
	picture:
		"https://s.gravatar.com/avatar/7c75a6d0353406bd3b978045f4d22a4f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fth.png",
	updated_at: "2020-05-25T23:04:19.119Z",
	email: "thibaut@test.fra",
	email_verified: false,
	sub: "auth0|5eb4d1213b10d60c015fd867",
	uid: "auth0|5eb4d1213b10d60c015fd867",
	firstname: "thibaut",
	phone: "1234567",
	address: "8 rue jean moulin",
	company: {
		id: 42,
		name: "EIP",
		email: "eip@eip.com",
		phone: "0123456789",
		address: "123 rue premiere",
		siret: "124578",
		siren: "1245789633",
		__typename: "company",
	},
};

const products = [
	{
		id: 24,
		brand: "Apple",
		name: "Iphone XS max",
		price_per_day: 9.99,
		price_per_month: 59.99,
		price_per_week: 179.99,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 25,
		brand: "Apple",
		name: "Ipad Pro",
		price_per_day: 19.99,
		price_per_month: 99.99,
		price_per_week: 379.99,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 26,
		brand: "TryMe",
		name: "Costume de Clown",
		price_per_day: 6.99,
		price_per_month: 99.99,
		price_per_week: 39.99,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 27,
		brand: "Hasbro",
		name: "Monopoly",
		price_per_day: 3.99,
		price_per_month: 39.99,
		price_per_week: 9.99,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 28,
		brand: "Apple",
		name: "Iohone test panier",
		price_per_day: 12,
		price_per_month: 300,
		price_per_week: 15,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 29,
		brand: "Apple",
		name: "Iphone test low stock",
		price_per_day: 10,
		price_per_month: 200,
		price_per_week: 50,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 30,
		brand: "Apple",
		name: "Iphone test 0 stock",
		price_per_day: 19,
		price_per_month: 299,
		price_per_week: 50,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 31,
		brand: "Sony",
		name: "PS4",
		price_per_day: 19,
		price_per_month: 299,
		price_per_week: 50,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
	{
		id: 32,
		brand: "Ikea",
		name: "Canapé en cuir",
		price_per_day: 10,
		price_per_month: 280,
		price_per_week: 70,
		product_descriptions: [],
		product_specifications: [],
		__typename: "product",
	},
];

const client = new ApolloClient({
	uri: "https://tryme-backend.herokuapp.com/v1/graphql",
	fetch: fetch,
});

localStorage.setItem("token", TOKEN);
localStorage.setItem("user", JSON.stringify(fakeUser));
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("client", client);
