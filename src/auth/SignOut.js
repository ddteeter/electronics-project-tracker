import React, { Component } from "react";
import { withAuthService } from "./AuthContext";

class SignOutBase extends Component {
  doSignOut = () => {
    this.props.authService.signOut();
  };

  render() {
    if (this.props.authService.auth.currentUser) {
      return (
        <button type="button" onClick={this.doSignOut}>
          Sign Out
        </button>
      );
    } else {
      return null;
    }
  }
}

const SignOut = withAuthService(SignOutBase);

export default SignOut;
