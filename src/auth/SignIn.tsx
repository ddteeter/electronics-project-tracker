import React, { SFC } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import { withAuthService } from "./context/AuthContext";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { AuthService } from ".";

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

type Props = {
  authService: AuthService;
} & RouteComponentProps;

const SignInBase: SFC<Props> = ({ authService }: Props) => {
  return (
    <div>
      <h1>Sign In</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authService.auth} />
    </div>
  );
};

const SignIn = withAuthService(SignInBase);

export default SignIn;
