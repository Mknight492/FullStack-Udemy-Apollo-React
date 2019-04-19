import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

//graphQL imports
import typeDefs from "./apollo/schema.mjs";
import resolvers from "./apollo/resolvers.mjs";

import ASE from "apollo-server-express";
import GQLT from "graphql-tools";

import Recipe from "./models/Recipe";
import User from "./models/User";

dotenv.config({ path: "../.env" });

const { makeExecutableSchema } = GQLT;
const { graphiqlExpress, graphqlExpress } = ASE;
console.log(makeExecutableSchema);
console.log(graphiqlExpress);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4444;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to DB"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`sever listening on ${PORT}`);
});

////
