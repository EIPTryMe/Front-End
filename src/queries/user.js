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
            cartsUid {
              id
            }
        }
    }
`;
