import React from "react";
import { Authenticated } from "../auth";
import { RouteComponentProps } from "@reach/router";

type Props = {} & RouteComponentProps;

class CartBuilder extends React.Component<Props, {}> {
  render() {
    return (
      <Authenticated>
        <div>Cart Builder</div>
      </Authenticated>
    );
  }
}

export default CartBuilder;
