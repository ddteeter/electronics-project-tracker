import React, { Component } from "react";
import ComponentsTable from "./ComponentsTable";
import InlineComponentEditor from "./InlineComponentEditor";

class Components extends Component {
  render() {
    return (
      <div>
        <ComponentsTable components={this.props.components} />
        <InlineComponentEditor />
      </div>
    );
  }
}

export default Components;
