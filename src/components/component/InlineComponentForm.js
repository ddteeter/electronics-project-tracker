import React, { Component } from "react";
import ComponentMetadataService from "./ComponentMetadataService";
import { withUserContext } from "../../auth/UserContext";

class InlineComponentFormBase extends Component {
  constructor(props) {
    super(props);

    this.componentMetatadataService = new ComponentMetadataService();

    this.setState({
      type: null,
      value: null,
      unit: null,
      quantity: null,
      unitOptions: [],
      componentTypes: []
    });
  }

  async componentDidMount() {
    this.setState({
      componentTypes: await this.componentMetatadataService.getComponentTypes(
        this.props.user
      )
    });
  }

  async updateUnitOptions(componentType) {
    this.setState({
      unitOptions: await this.componentMetatadataService.getComponentMetadata(
        this.props.user,
        componentType
      )
    });
  }

  onComponentTypeChange = event => {
    this.onChange(event);
    this.updateUnitOptions(event.target.value);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isFormValid: event.target.form.checkValidity()
    });
  };

  onSubmit = async event => {
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
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="type">
          Type
          <select id="type" name="type" onBlur={this.onChange}>
            {this.state.componentTypes.map(componentType => (
              <option value={componentType.value}>{componentType.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value">
          Value
          <input
            id="value"
            type="number"
            name="value"
            size="10"
            maxLength="10"
            onChange={this.onChange}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="unit">
          Unit
          <select id="unit" name="unit" onBlur={this.onChange}>
            {this.state.unitOptions.map(unit => (
              <option value={unit.value}>{unit.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">
          Quantity
          <input
            id="quantity"
            type="number"
            name="quantity"
            size="10"
            maxLength="10"
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
