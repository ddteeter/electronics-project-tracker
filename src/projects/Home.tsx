import React, { SFC } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import List from "./List";
import Project from "./model/Project";

type Props = {
  projects: Project[];
} & RouteComponentProps;

const Home: SFC<Props> = ({ projects }) => (
  <div>
    <Link to="create">Create New Project</Link>
    <List projects={projects} />
  </div>
);

export default Home;
