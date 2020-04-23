import React from "react";
import "./App.css";
import Overview from "./Overview";
import content from "../apis/content";

class App extends React.Component {
  state = { records: [] };

  componentDidMount() {
    this.getRecords();
  }

  getRecords = async () => {
    const response = await content.get("/5ea1f0f83100009f601eeef0");
    const data = response.data;
    this.setState({
      records: data
    });
  };

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
