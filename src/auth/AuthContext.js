import React from "react";

const AuthContext = React.createContext(null);

export const withAuthService = Component => props => (
  <AuthContext.Consumer>
    {authService => <Component {...props} authService={authService} />}
  </AuthContext.Consumer>
);

export default AuthContext;
