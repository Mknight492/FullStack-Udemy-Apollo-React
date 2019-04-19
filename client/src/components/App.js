import React, { Component } from "react";
import "./App.css";

import Recipies from "./recipies";
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

export default App;
