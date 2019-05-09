import React, { useEffect } from "react";

import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "./apollo/users/queries";

import { useUser } from "./userContext";

const withSession = Component => props => {
  const [user, setUser] = useUser();
  return (
    <Query query={GET_CURRENT_USER}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (data && data.getCurrentUser && data.getCurrentUser) {
          const { getCurrentUser } = data;
          setUser(x => getCurrentUser);
        }
        return <Component {...props} />;
      }}
    </Query>
  );
};

export default withSession;
