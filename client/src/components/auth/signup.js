import React, { useState } from "react";

//apollo
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../apollo/recipies/mutations";

import styled from "styled-components";

//components
import Error from "../error";

const SignUp = () => {
  const initalState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [form, setForm] = useState({
    ...initalState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => {
      const newForm = { ...form };
      newForm[name] = value;
      return newForm;
    });
  };

  const { username, email, password, confirmPassword } = form;

  const handleSubmit = async (event, signupUser) => {
    event.preventDefault();
    const data = await signupUser();
    console.log(data);
    setForm({ ...initalState });
  };

  const validateForm = () => {
    if (password !== confirmPassword) return false;
    if (Object.values(form).some(el => el === "")) return false;
    console.log(Object.values(form).some(el => el == ""));
    Object.values(form).map(el => console.log(el));
    return true;
  };

  return (
    <div>
      <h2>SignUp</h2>
      <Mutation
        mutation={SIGNUP_USER}
        variables={{ username, email, password }}
      >
        {(signupUser, { data, loading, error }) => {
          return (
            <form onSubmit={e => handleSubmit(e, signupUser)}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={form.confirmPassword}
              />
              <button type="submit" disabled={loading || !validateForm()}>
                {" "}
                submit{" "}
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
