import React, { Component } from "react";

class ComponentsTable extends Component {
  render() {
    return (
      <table className="components">
        <ComponentsTableHeader />
        <ComponentsTableBody components={this.props.components} />
      </table>
    );
  }
}

export default ComponentsTable;
