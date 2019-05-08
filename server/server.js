import "babel-polyfill";

import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

//graphQL imports
import typeDefs from "./apollo/schema.js";
import resolvers from "./apollo/resolvers.js";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

//Database imports
import Recipe from "./models/Recipe";
import User from "./models/User";

//network imports
import cors from "cors";

//config imports
dotenv.config({ path: "../.env" });
const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

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

//
