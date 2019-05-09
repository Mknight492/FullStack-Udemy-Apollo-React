import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//apollo
import ApolloClient, { fromPromise } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

//components
import Root from "./components/App";

//HOC / hooks
import { UserProvider, useUser } from "./userContext";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error: ", networkError);
    }
    if (networkError && networkError.statusCode === 401) {
      localStorage.removeItem("token");
    }
  },
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <Root />
    </UserProvider>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
