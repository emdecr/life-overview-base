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
    const response = await content.post(null, payload);
    const data = response.data.body_response;
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
