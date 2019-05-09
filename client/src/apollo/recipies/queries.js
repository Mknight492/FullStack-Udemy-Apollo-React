import { gql } from "apollo-boost";

export const GET_ALL_RECIPIES = gql`
  query getAllRecipies {
    getAllRecipies {
      _id
      name
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;
