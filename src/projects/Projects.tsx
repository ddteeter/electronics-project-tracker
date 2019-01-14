import React, { SFC } from "react";
import { Router, RouteComponentProps, navigate } from "@reach/router";
import Home from "./Home";
import Create from "./Create";
import ProjectView from "./ProjectView";
import Project from "./model/Project";
import { Authenticated } from "../auth";

type Props = {
  onNewProject(project: Project): void;
  projects: Project[];
  projectId?: string;
} & RouteComponentProps;

const Projects: SFC<Props> = ({ onNewProject, projects, projectId }) => (
  <Authenticated>
    <Router>
      <Home path="/" projects={projects} default />
      <Create path="create" onNewProject={onNewProject} />
      <ProjectView path=":projectId" projectId={projectId || "invalid-path"} />
    </Router>
  </Authenticated>
);

export default Projects;
