//import gql from "graphql-tools";

const schema = `
type Recipe{
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    Linkes: Int
    username: String!
}
type User{
    _id: ID
    username: String! @unique
    password: String!
    email: String! @unique
    joinDate: String
    favourites: [Recipe!]!

}

type Query{
    getAllRecipies: [Recipe]
}

type Mutation{
    addRecipe(
        name: String!,
        category: String!,
        description: String!,
        instructions: String!,
        username: String!): Recipe
}
`;

export default schema;
