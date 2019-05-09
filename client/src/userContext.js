import React, { createContext, useState } from "react";

const UserContext = createContext();

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

const UserProvider = props => {
  const [user, setUser] = useState(null);
  const value = React.useMemo(() => [user, setUser], [user]);
  return <UserContext.Provider value={[user, setUser]} {...props} />;
};
export { UserProvider, useUser };
