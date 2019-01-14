import React from "react";
import ComponentMetadataService from "./service/ComponentMetadataService";
import { withUserContext } from "../../auth/context/UserContext";
import Component from "./model/Component";
import UnitType from "./model/UnitType";
import ComponentType from "./model/ComponentType";
import { User } from "@firebase/auth-types";

type Props = {
  onComponentSave(component: Component): void;
  user: User;
};

const initialState = {
  type: undefined as string | undefined,
  value: undefined as string | undefined,
  unit: undefined as string | undefined,
  quantity: undefined as number | undefined,
  unitOptions: [] as UnitType[],
  componentTypes: [] as ComponentType[],
  isFormValid: false
};

type State = Readonly<typeof initialState>;

class InlineComponentFormBase extends React.Component<Props, State> {
  private componentMetadataSerivce: ComponentMetadataService;

  constructor(props: Props) {
    super(props);

    this.componentMetadataSerivce = new ComponentMetadataService();

    this.setState(initialState);
  }

  async componentDidMount() {
    let componentTypes = await this.componentMetadataSerivce.getComponentTypes(
      this.props.user
    );
    this.setState({
      componentTypes: componentTypes
    });
  }

  async updateUnitOptions(selectedComponentType: string) {
    this.setState({
      unitOptions: (
        this.state.componentTypes.find(
          componentType => componentType.id === selectedComponentType
        ) || { unitOptions: initialState.unitOptions }
      ).unitOptions
    });
  }

  onComponentTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.onChange(event);
    this.updateUnitOptions(event.currentTarget.value);
  };

  onChange = (
    event: React.FormEvent<{
      name: string;
      value: string;
      form: HTMLFormElement | null;
    }>
  ) => {
    this.setState(({
      [event.currentTarget.name]: event.currentTarget.value,
      isFormValid: event.currentTarget.form
        ? event.currentTarget.form.checkValidity()
        : initialState.isFormValid
    } as unknown) as State);
  };

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onComponentSave({
      type: this.state.type,
      value: this.state.value,
      unit: this.state.unit,
      quantity: this.state.quantity
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="type">
          Type
          <select id="type" name="type" onBlur={this.onChange}>
            {this.state.componentTypes.map(componentType => (
              <option value={componentType.id}>
                {componentType.displayValue}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="value">
          Value
          <input
            id="value"
            type="number"
            name="value"
            size={10}
            maxLength={10}
            onChange={this.onChange}
          />
        </label>
        <label htmlFor="unit">
          Unit
          <select id="unit" name="unit" onBlur={this.onChange}>
            {this.state.unitOptions.map(unit => (
              <option value={unit.id}>{unit.displayValue}</option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">
          Quantity
          <input
            id="quantity"
            type="number"
            name="quantity"
            size={10}
            maxLength={10}
            onChange={this.onChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    );
  }
}

const InlineComponentForm = withUserContext(InlineComponentFormBase);

export default InlineComponentForm;
