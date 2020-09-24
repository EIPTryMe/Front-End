import {gql} from "apollo-boost";


export const SEND_MESSAGE = gql`
mutation send_Message (
    $conversation_id: Int!
    $user_id: Int!
    $message: String!
    $user_name: String!
) {
    insert_message_one(object: {conversation_id: $conversation_id, user_id: $user_id, message: $message, user_name: $user_name}) {
        id
  }
}`;

export const CREATE_CONV = gql`
mutation create_conf (
    $objet: String!
    $title: String!
) {
   insert_conversation_one(object: {objet: $objet, title: $title}) {
    id
  }
}
`;

export const SET_USER_CONVERSATION = gql`
mutation Set_User_conversation (
    $user_id : Int!
    $conversation_id : Int!
) {
   insert_user_conversation_one(object: {conversation_id: $conversation_id, user_id: $user_id}) {
    conversation_id
  }
}
`;

export const CHAT_GET_CONV = gql`
   query getAllChat  {
    conversation {
        creation_date
        id
        last_message_date
        messages (order_by: {creation_date: asc}){
            message
            user_id
            user_name
            id
            edition_date
            creation_date
            conversation_id
           user{
            first_name
            }
        }
    }
}
`;

