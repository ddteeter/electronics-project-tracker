import UnitType from "./UnitType";

class ComponentType {
  readonly id: string;
  readonly displayValue: string;
  readonly unitOptions: UnitType[];

  constructor(id: string, displayValue: string, unitOptions: UnitType[]) {
    this.id = id;
    this.displayValue = displayValue;
    this.unitOptions = unitOptions;
  }
}

export default ComponentType;
