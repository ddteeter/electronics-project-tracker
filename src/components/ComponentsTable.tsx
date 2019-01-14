import React, { SFC } from "react";
import ComponentsTableHeader from "./ComponentsTableHeader";
import ComponentsTableBody from "./ComponentsTableBody";
import Component from "./component/model/Component";

type Props = {
  components: Component[];
};

let ComponentsTable: SFC<Props> = ({ components }: Props) => {
  return (
    <table className="components">
      <ComponentsTableHeader />
      <ComponentsTableBody components={components} />
    </table>
  );
};

export default ComponentsTable;
