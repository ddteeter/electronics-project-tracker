import React from "react";
import InlineComponentForm from "./InlineComponentForm";
import Component from "./model/Component";

const initialState = {
  adding: false,
  saving: false
};

type State = Readonly<typeof initialState>;

type Props = {
  onComponentSave(component: Component): Promise<Component>;
};

class InlineComponentEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  addComponent = (event: React.FormEvent<HTMLButtonElement>) => {
    this.setState({
      adding: true
    });
  };

  cancelAddComponent = (event: React.FormEvent<HTMLButtonElement>) => {
    this.closeAddComponent();
  };

  saveComponent = async (component: Component) => {
    this.setState({
      saving: true
    });
    await this.props.onComponentSave(component);
    this.closeAddComponent();
    this.setState({
      saving: false
    });
  };

  closeAddComponent = () => {
    this.setState({
      adding: false
    });
  };

  render() {
    return (
      <div>
        {this.state.adding ? (
          <div>
            <InlineComponentForm onComponentSave={this.saveComponent} />
            <button type="button" onClick={this.cancelAddComponent}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={this.addComponent}>
            Add Component
          </button>
        )}
      </div>
    );
  }
}

export default InlineComponentEditor;
