import React, { Component } from "react";
import "./App.css";

import Recipies from "./recipies";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//components
import Signin from "./auth/signin";
import Signup from "./auth/signup";

//styles

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

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

export default Root;
