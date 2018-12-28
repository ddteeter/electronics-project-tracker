import React, { Component } from "react";
import { navigate } from "@reach/router";
import ProjectsService from "./ProjectService";
import { withUserContext } from "../auth/UserContext";
import Components from "../components/Components";

class CreateBase extends Component {
  cosntructor() {
    this.projectsService = new ProjectsService();
    this.buildDocsInput = React.createRef();
  }

  componentWillMount() {
    this.setState({
      name: "",
      bom: "manual"
    });
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isFormValid: event.target.form.checkValidity()
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    let project = this.projectsService.createProject(
      this.props.user,
      this.state,
      this.buildDocsInput.current.files
    );
    this.props.onNewProject(project);
    navigate("/projects");
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
              required="true"
              maxLength="256"
              size="256"
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
              multiple="true"
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
          {this.state.bom === "parse" ? "" : <Components />}
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const Create = withUserContext(CreateBase);

export default Create;
