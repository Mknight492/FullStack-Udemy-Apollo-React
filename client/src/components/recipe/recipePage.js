import React from "react";

//qraphQL
import { Query } from "react-apollo";
import { GET_RECIPE } from "../../apollo/recipies/queries";

//components /HOCs
import { withRouter } from "react-router-dom";
import { load } from "babel-register/lib/cache";

const Recipe = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div> loading...</div>;
        if (error) return <div>{error.message}</div>;
        if (data && data.getRecipe) {
          const {
            name,
            category,
            description,
            instructions,
            likes,
            username
          } = data.getRecipe;
          return (
            <div>
              <h2>{name}</h2>
              <p> Category: {category}</p>
              <p> Description: {description}</p>
              <p> Instructions: {instructions}</p>
              <p> Likes: {likes}</p>
              <p> Created By: {username}</p>
            </div>
          );
        }
        return null;
      }}
    </Query>
  );

  //   <div> Recipe {_id}</div>;
};

export default withRouter(Recipe);
