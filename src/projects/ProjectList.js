import React, { Component } from "react";
import { Link } from "@reach/router";

class ProjectList extends Component {
  render() {
    return (
      <ul>
        {this.props.projects.map(project => {
          return (
            <li key={project.id}>
              <Link to={"" + project.id}>{project.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ProjectList;
