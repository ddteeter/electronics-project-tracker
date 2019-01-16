import React, { SFC } from "react";
import { Router, RouteComponentProps, navigate } from "@reach/router";
import Home from "./Home";
import Create from "./Create";
import View from "./View";
import Project from "./model/Project";
import { Authenticated } from "../auth";

type Props = {
  onNewProject(project: Project): void;
  projects: Project[];
  projectId?: string;
} & RouteComponentProps;

const Routes: SFC<Props> = ({ onNewProject, projects, projectId }) => (
  <Authenticated>
    <Router>
      <Home path="/" projects={projects} default />
      <Create path="create" onNewProject={onNewProject} />
      <View path=":projectId" projectId={projectId || "invalid-path"} />
    </Router>
  </Authenticated>
);

export default Routes;
