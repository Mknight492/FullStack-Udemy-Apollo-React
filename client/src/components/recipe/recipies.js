import React, { Component } from "react";

import { Query } from "react-apollo";

import { GET_ALL_RECIPIES } from "../../apollo/queries";

import RecipeItem from "./recipeItem";
class Recipies extends Component {
  render() {
    return (
      <Query query={GET_ALL_RECIPIES}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading..</div>;
          if (error) return <div> error: {error.message}</div>;
          console.log(data);
          return (
            <ul>
              {data.getAllRecipies.map(recipe => (
                <RecipeItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Recipies;
