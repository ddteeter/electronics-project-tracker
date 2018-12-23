import React, { Component } from "react";
import { navigate } from "@reach/router";
import { withAuthService } from "./AuthContext";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: () => {
      navigate("/projects");
      return false;
    }
  },
  credentialHelper: "none",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class SignInBase extends Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={this.props.authService.auth}
        />
      </div>
    );
  }
}

const SignIn = withAuthService(SignInBase);

export default SignIn;
