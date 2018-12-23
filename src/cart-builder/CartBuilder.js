import React, { Component } from "react";
import { Authenticated } from "../auth";

class CartBuilder extends Component {
  render() {
    return (
      <Authenticated>
        <div>Cart Builder</div>
      </Authenticated>
    );
  }
}

export default CartBuilder;
