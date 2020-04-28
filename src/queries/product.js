import { gql } from 'apollo-boost';

export const GET_PRODUCTS = gql`
	{
	    product {
                id
                brand
                name
                price_per_day
                price_per_month
                price_per_week
                product_descriptions {
                                        id
                                        name
                }
                product_specifications{
                                        name
                                        id
                }
        }
    }
`;
