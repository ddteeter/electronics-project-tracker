import React from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import { withUserContext } from "../auth/context/UserContext";
import Components from "../components/Components";
import ProjectsService from "./service/ProjectsService";
import { User } from "firebase";
import Project from "./model/Project";
import Component from "../components/component/model/Component";

type Props = {
  user: User;
  onNewProject(project: Project): void;
} & RouteComponentProps;

const initialState = {
  name: "",
  buildDocEntry: "url",
  bom: "parse",
  isFormValid: false
};

type State = Readonly<typeof initialState>;

class CreateBase extends React.Component<Props, State> {
  private projectsService: ProjectsService;
  private fileBuildDocsInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.projectsService = new ProjectsService();
    this.fileBuildDocsInput = React.createRef();
  }

  componentWillMount() {
    this.setState(initialState);
  }

  onChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
      isFormValid: event.currentTarget.form
        ? event.currentTarget.form.checkValidity()
        : initialState.isFormValid
    } as State);
  };

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let project = await this.projectsService.createProject(
      this.props.user,
      this.state,
      this.fileBuildDocsInput.current
        ? this.fileBuildDocsInput.current.files
        : null
    );
    this.props.onNewProject(project);
    navigate("/projects");
  };

  onComponentSave = async (component: Component): Promise<Component> => {
    return new Component();
  };

  render() {
    return (
      <div>
        <h2>Create a New Project</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              required={true}
              maxLength={256}
              size={64}
              value={this.state.name}
              onChange={this.onChange}
            />
          </label>
          <div>
            <p>Build Document Entry Method</p>
            <label htmlFor="urlBuildDoc">
              <input
                type="radio"
                id="urlBuildDoc"
                name="buildDocEntry"
                value="url"
                checked={this.state.buildDocEntry === "url"}
                onChange={this.onChange}
              />
              Pull from URL
            </label>
            <label htmlFor="fileBuildDoc">
              <input
                type="radio"
                id="fileBuildDoc"
                name="buildDocEntry"
                value="file"
                checked={this.state.buildDocEntry === "file"}
                onChange={this.onChange}
              />
              Upload File
            </label>
          </div>
          {this.state.buildDocEntry === "url" ? (
            <label htmlFor="urlBuildDocs">
              Build Doc URL
              <input type="url" name="urlBuildDocs" id="urlBuildDocs" />
            </label>
          ) : (
            <label htmlFor="fileBuildDocs">
              Build Doc Files
              <input
                type="file"
                name="fileBuildDocs"
                id="fileBuildDocs"
                multiple={true}
                ref={this.fileBuildDocsInput}
              />
            </label>
          )}
          <div>
            <p>Components/BOM Entry Method</p>
            <label htmlFor="parseBOM">
              <input
                type="radio"
                id="parseBOM"
                name="bom"
                value="parse"
                checked={this.state.bom === "parse"}
                onChange={this.onChange}
              />
              Parse Document
            </label>
            <label htmlFor="manualBOM">
              <input
                type="radio"
                id="manualBOM"
                name="bom"
                value="manual"
                checked={this.state.bom === "manual"}
                onChange={this.onChange}
              />
              Manual Entry
            </label>
          </div>
          {this.state.bom === "parse" ? null : (
            <Components
              components={[]}
              onComponentSave={this.onComponentSave}
            />
          )}
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const Create = withUserContext(CreateBase);

export default Create;
