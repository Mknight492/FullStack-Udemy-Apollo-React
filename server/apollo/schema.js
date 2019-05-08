//import gql from "graphql-tools";

const schema = `
type Recipe{
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    likes: Int
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

type Token {
    token: String!
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

    signupUser(
        username: String! @unique
        password: String!
        email: String! @unique): Token
}
`;

export default schema;
