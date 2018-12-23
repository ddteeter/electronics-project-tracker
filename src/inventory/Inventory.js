import React, { Component } from "react";
import { Authenticated } from "../auth";

class Inventory extends Component {
  render() {
    return (
      <Authenticated>
        <div>Inventory</div>
      </Authenticated>
    );
  }
}

export default Inventory;
