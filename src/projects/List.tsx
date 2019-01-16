import React, { SFC } from "react";
import { Link } from "@reach/router";
import Project from "./model/Project";

type Props = {
  projects: Project[];
};

const List: SFC<Props> = ({ projects }) => (
  <ul>
    {projects.map(project => {
      return (
        <li key={project.id}>
          <Link to={"" + project.id}>{project.name}</Link>
        </li>
      );
    })}
  </ul>
);

export default List;
