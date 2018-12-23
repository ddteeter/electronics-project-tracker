import React, { Component } from "react";

class Email extends Component {
  render() {
    return (
      <input
        type="email"
        name="email"
        value={this.props.email}
        placeholder="Email Address"
        size="64"
        required={true}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Email;
