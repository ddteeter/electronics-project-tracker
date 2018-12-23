import { Component } from "react";
import { navigate } from "@reach/router";
import { withAuthService } from "./AuthContext";

class AuthenticatedBase extends Component {
  render() {
    if (this.props.authService.auth.currentUser) {
      return this.props.children;
    } else {
      navigate("/sign-in");
      return null;
    }
  }
}

const Authenticated = withAuthService(AuthenticatedBase);

export default Authenticated;
