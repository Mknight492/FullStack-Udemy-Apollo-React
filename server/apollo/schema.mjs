//import gql from "graphql-tools";

const schema = `
type Recipe{
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    Linkes: Int
    username: String!
}
type User{
    username: String! @unique
    password: String!
    email: String! @unique
    joinDate: String
    favourites: [Recipe!]!

}

type Query{
    getAllRecipies: [Recipe]
}
`;

export default schema;
