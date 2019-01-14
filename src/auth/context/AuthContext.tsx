import React from "react";
import { AuthService } from "..";

type AuthServiceAwareProps = {
  authService: AuthService;
};

const AuthContext = React.createContext<AuthService | undefined>(undefined);

function withAuthService<P extends AuthServiceAwareProps>(
  Component: React.ComponentType<P>
) {
  return function ComponentWithAuthService(
    props: Pick<P, Exclude<keyof P, keyof AuthServiceAwareProps>>
  ) {
    return (
      <AuthContext.Consumer>
        {authService =>
          authService && <Component {...props as P} authService={authService} />
        }
      </AuthContext.Consumer>
    );
  };
}

export { withAuthService };
export default AuthContext;
