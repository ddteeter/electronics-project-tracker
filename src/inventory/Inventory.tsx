import React, { Component } from "react";
import { Authenticated } from "../auth";
import { RouteComponentProps } from "@reach/router";

type Props = {} & RouteComponentProps;

class Inventory extends Component<Props, {}> {
  render() {
    return (
      <Authenticated>
        <div>Inventory</div>
      </Authenticated>
    );
  }
}

export default Inventory;
