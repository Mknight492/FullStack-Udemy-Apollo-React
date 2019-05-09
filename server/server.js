import "babel-polyfill";

import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

//graphQL imports
import typeDefs from "./apollo/schema.js";
import resolvers from "./apollo/resolvers.js";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema, ReplaceFieldWithFragment } from "graphql-tools";

//Database imports
import Recipe from "./models/Recipe";
import User from "./models/User";

//network imports
import cors from "cors";

//JWT imports
import jwt from "jsonwebtoken";

//config imports
dotenv.config({ path: "../.env" });
const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

//setup JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
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
