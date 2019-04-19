import React, { Component } from "react";

import { Query } from "react-apollo";

import { GET_ALL_RECIPIES } from "../apollo/queries";

class Recipies extends Component {
  render() {
    return (
      <Query query={GET_ALL_RECIPIES}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading..</div>;
          if (error) return <div> error: {error.message}</div>;
          console.log(data);
          return data.getAllRecipies.map(el => {
            return <div> {el.name}</div>;
          });
        }}
      </Query>
    );
  }
}

export default Recipies;
