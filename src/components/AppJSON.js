import React from "react";
import "./App.css";
import Overview from "./Overview";
let exampleJSON = require("../json/records.json");

class App extends React.Component {
  state = { records: exampleJSON };

  render() {
    return (
      <div className="container">
        <h1>Life Overview</h1>
        <Overview records={this.state.records} />
      </div>
    );
  }
}

export default App;
