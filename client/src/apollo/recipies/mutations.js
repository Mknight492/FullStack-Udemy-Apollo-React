import { gql } from "apollo-boost";

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        joinDate
        favourites {
          _id
          likes
        }
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
      user {
        username
        email
        joinDate
        favourites {
          _id
          likes
        }
      }
    }
  }
`;
