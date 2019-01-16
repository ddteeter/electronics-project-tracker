import React from "react";
import Project from "./model/Project";
import { RouteComponentProps } from "@reach/router";
import ProjectsService from "./service/ProjectsService";
import { User } from "firebase";
import { withUserContext } from "../auth";
import JsonResponse from "../common/JsonResponse";

type Props = {
  projectId: string;
  user: User;
} & RouteComponentProps;

let initialState = {
  isLoading: true,
  project: undefined as Project | undefined
};

type State = Readonly<typeof initialState>;

class ViewBase extends React.Component<Props, State> {
  private projectsService: ProjectsService;

  constructor(props: Props) {
    super(props);

    this.projectsService = new ProjectsService();
  }

  async componentDidMount() {
    this.setState({
      isLoading: false,
      project: await this.projectsService.getProject(
        this.props.user,
        this.props.projectId
      )
    });
  }

  render() {
    return (
      <h2>{this.state.isLoading ? "Loading..." : this.state.project!.name}</h2>
    );
  }
}

const View = withUserContext(ViewBase);

export default View;
