import { SFC } from "react";
import { Redirect } from "@reach/router";
import { withAuthService } from "./context/AuthContext";
import AuthService from "./service/AuthService";

type Props = {
  authService: AuthService;
};

const AuthenticatedBase: SFC<Props> = ({ authService, children }) => (
  <div>
    {authService.auth.currentUser ? children : <Redirect to="/sign-in" />}
  </div>
);

const Authenticated = withAuthService(AuthenticatedBase);

export default Authenticated;
