import Component from "./component/model/Component";
import React, { SFC } from "react";

type Props = {
  components: Component[];
};

let ComponentsTableBody: SFC<Props> = ({ components }: Props) => {
  return <tbody />;
};

export default ComponentsTableBody;
