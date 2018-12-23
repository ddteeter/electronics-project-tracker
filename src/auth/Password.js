import React, { Component } from "react";

class Password extends Component {
  render() {
    return (
      <input
        type="password"
        name={this.props.name || "password"}
        value={this.props.password}
        minLength="12"
        placeholder="Password"
        size="64"
        required={true}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Password;
