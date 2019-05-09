import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      password
      favourites {
        _id
        likes
      }
    }
  }
`;
