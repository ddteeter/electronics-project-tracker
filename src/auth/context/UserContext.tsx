import React from "react";
import { User } from "@firebase/auth-types";

type UserAwareProps = {
  user: User;
};

const UserContext = React.createContext<User | undefined>(undefined);

function withUserContext<P extends UserAwareProps>(
  Component: React.ComponentType<P>
) {
  return function ComponentWithUser(
    props: Pick<P, Exclude<keyof P, keyof UserAwareProps>>
  ) {
    return (
      <UserContext.Consumer>
        {user => user && <Component {...props as P} user={user} />}
      </UserContext.Consumer>
    );
  };
}

export { withUserContext };
export default UserContext;
