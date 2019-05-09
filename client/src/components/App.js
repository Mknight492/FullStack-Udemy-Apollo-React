import React, { Component, Fragment, useEffect } from "react";
import "./App.css";

import Recipies from "./recipe/recipies";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//components
import NavBar from "./nav";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import AddRecipe from "./recipe/addRecipe";
import Recipe from "./recipe/recipePage";
import Profile from "./auth/profile";
import WithSession from "../withSession";

//styles

//HOC / hooks

const Root = () => {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/recipe/add" component={AddRecipe} />
          <Route path="/recipe/:_id" component={Recipe} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  );
};

const RootWithSession = WithSession(Root);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <Recipies />
      </div>
    );
  }
}

export default RootWithSession;
