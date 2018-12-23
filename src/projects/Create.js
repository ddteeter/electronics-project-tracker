import React, { Component } from "react";
import { navigate } from "@reach/router";

class Create extends Component {
  componentWillMount() {
    this.setState({
      name: ""
    });
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onNewProject(this.state);
    navigate("/projects");
  };

  render() {
    return (
      <div>
        <h2>Create a New Project</h2>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default Create;
