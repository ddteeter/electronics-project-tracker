import React, { Component } from "react";
import { Link } from "@reach/router";
import ProjectList from "./ProjectList";

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="create">Create New Project</Link>
        <ProjectList projects={this.props.projects} />
      </div>
    );
  }
}

export default Home;
