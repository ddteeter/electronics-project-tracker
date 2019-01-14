import React, { SFC } from "react";
import { withAuthService } from "./context/AuthContext";
import { AuthService } from ".";

type Props = {
  authService: AuthService;
};

const SignOutBase: SFC<Props> = ({ authService }: Props) => {
  if (authService.auth.currentUser) {
    return (
      <button type="button" onClick={() => authService.signOut()}>
        Sign Out
      </button>
    );
  } else {
    return null;
  }
};

const SignOut = withAuthService(SignOutBase);

export default SignOut;
