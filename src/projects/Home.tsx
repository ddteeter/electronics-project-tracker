import React, { SFC } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import ProjectList from "./ProjectList";
import Project from "./model/Project";

type Props = {
  projects: Project[];
} & RouteComponentProps;

const Home: SFC<Props> = ({ projects }) => (
  <div>
    <Link to="create">Create New Project</Link>
    <ProjectList projects={projects} />
  </div>
);

export default Home;
