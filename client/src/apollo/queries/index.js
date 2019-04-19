import { gql } from "apollo-boost";

export const GET_ALL_RECIPIES = gql`
  query getAllRecipies {
    getAllRecipies {
      _id
      name
      category
      description
      instructions
      username
      likes
      username
    }
  }
`;
