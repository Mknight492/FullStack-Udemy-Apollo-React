import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import ApolloClient, { fromPromise } from "apollo-boost";

import { ApolloProvider } from "react-apollo";

import Root from "./components/App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
