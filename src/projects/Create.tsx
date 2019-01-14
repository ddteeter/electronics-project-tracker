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
  bom: "manual",
  isFormValid: false
};

type State = Readonly<typeof initialState>;

class CreateBase extends React.Component<Props, State> {
  private projectsService: ProjectsService;
  private buildDocsInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.projectsService = new ProjectsService();
    this.buildDocsInput = React.createRef();
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
      this.buildDocsInput.current ? this.buildDocsInput.current.files : null
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
          <label htmlFor="buildDocs">
            Build Docs
            <input
              type="file"
              name="file"
              id="buildDocs"
              multiple={true}
              ref={this.buildDocsInput}
            />
          </label>
          <div>
            <p>Components/BOM Entry Method</p>
            <label htmlFor="manualBOM">
              <input
                type="radio"
                id="manualBOM"
                name="bom"
                value="manual"
                onChange={this.onChange}
              />
              Manual Entry
            </label>
            <label htmlFor="parseBOM">
              <input
                type="radio"
                id="parseBOM"
                name="bom"
                value="parse"
                onChange={this.onChange}
              />
              Parse Document <span className="info-tooltip">&nbsp;</span>
            </label>
          </div>
          {this.state.bom === "parse" ? (
            ""
          ) : (
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
