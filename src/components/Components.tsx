import React, { SFC } from "react";
import ComponentsTable from "./ComponentsTable";
import InlineComponentEditor from "./component/InlineComponentEditor";
import Component from "./component/model/Component";

type Props = {
  components: Component[];
  onComponentSave(component: Component): Promise<Component>;
};

let Components: SFC<Props> = ({ components, onComponentSave }: Props) => {
  return (
    <div>
      <ComponentsTable components={components} />
      <InlineComponentEditor onComponentSave={onComponentSave} />
    </div>
  );
};

export default Components;
