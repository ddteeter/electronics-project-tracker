import React, { Component } from "react";
import InlineComponentForm from "./InlineComponentForm";

class InlineComponentEditor extends Component {
  constructor(props) {
    super(props);

    this.setState({
      adding: false
    });
  }

  addComponent = event => {
    this.setState({
      adding: true
    });
  };

  cancelAddComponent = event => {
    this.setState({
      adding: false
    });
  };

  render() {
    return (
      <div>
        {this.state.adding ? (
          <div>
            <InlineComponentForm />
            <button type="button" onClick={this.cancelAddComponent}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={this.addComponent}>
            Add Component
          </button>
        )}
        {this.state}
      </div>
    );
  }
}

export default InlineComponentEditor;
