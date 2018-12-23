import React, { Component } from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Create from "./Create";
import Project from "./Project";
import { Authenticated } from "../auth";

class Projects extends Component {
  onNewProject = project => {
    this.props.onNewProject(project);
  };

  render() {
    return (
      <Authenticated>
        <Router>
          <Home path="/" projects={this.props.projects} default />
          <Create path="create" onNewProject={this.onNewProject} />
          <Project
            path=":projectId"
            name={this.props.projects.find(
              project => project.id === this.props.projectId
            )}
          />
        </Router>
      </Authenticated>
    );
  }
}

export default Projects;
