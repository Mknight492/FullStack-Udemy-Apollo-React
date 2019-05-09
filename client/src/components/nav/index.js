import React from "react";

//nav
import { Link, NavLink } from "react-router-dom";

//HOC / hooks
import { useUser } from "../../userContext";

const Navbar = () => {
  const [user, setUser] = useUser();
  console.log(user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <RenderLoggedIn user={user} setUser={setUser} />{" "}
        <RenderLoggedOut user={user} />
      </ul>
    </nav>
  );
};

const RenderLoggedIn = ({ user, setUser }) => {
  return user ? (
    <>
      <li>
        <NavLink to="/recipe/add" exact>
          Add recipe
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" exact>
          Profile
        </NavLink>
      </li>
      <li
        onClick={e => {
          e.preventDefault();
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        <NavLink to="/logout" exact>
          Logout
        </NavLink>
      </li>
    </>
  ) : null;
};

const RenderLoggedOut = ({ user }) => {
  return !user ? (
    <>
      <li>
        <NavLink to="/signin" exact>
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" exact>
          Sign Up
        </NavLink>
      </li>
    </>
  ) : null;
};

export default Navbar;
