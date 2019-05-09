import React, { useState } from "react";

//apollo
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../apollo/recipies/mutations";

import styled from "styled-components";

//components
import Error from "../error";

//HOC / hooks
import { useUser } from "../../userContext";

const SignUp = () => {
  const initalState = {
    username: "",
    password: ""
  };

  const [form, setForm] = useState({
    ...initalState
  });

  const [user, setUser] = useUser();

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => {
      const newForm = { ...form };
      newForm[name] = value;
      return newForm;
    });
  };

  const { username, password } = form;

  const handleSubmit = async (event, signinUser) => {
    event.preventDefault();
    const { data } = await signinUser();
    console.log(data);
    localStorage.setItem("token", data.signinUser.token);
    console.log(data.signinUser.user);
    setUser(x => data.signinUser.user);
    setForm({ ...initalState });
  };

  const validateForm = () => !Object.values(form).some(el => el === "");

  return (
    <div>
      {user && user.username && <p> currentUser : {user.username}</p>}
      <h2>Sign In</h2>
      <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
        {(signinUser, { data, loading, error }) => {
          return (
            <form onSubmit={e => handleSubmit(e, signinUser)}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
              <button type="submit" disabled={loading || !validateForm()}>
                {" "}
                sign in{" "}
              </button>
              {error && <Error error={error} />}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default SignUp;
