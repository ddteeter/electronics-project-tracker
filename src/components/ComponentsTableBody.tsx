import Component from "./component/model/Component";
import React, { SFC } from "react";

type Props = {
  components: Component[];
};

let ComponentsTableBody: SFC<Props> = ({ components }: Props) => {
  return <div />;
};

export default ComponentsTableBody;
