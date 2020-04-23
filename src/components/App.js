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
    const response = await content.get("/5ea1edaa31000027631eeedc");
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
