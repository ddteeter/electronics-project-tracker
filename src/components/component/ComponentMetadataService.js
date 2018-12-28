import BaseService from "../common/BaseService";

class ComponentMetadataService extends BaseService {
  getComponentTypes(user) {
    // return Promise.resolve([
    //   {
    //     name: "Resistor",
    //     value: "resistor"
    //   },
    //   {
    //     name: "Capacitor",
    //     value: "capacitor"
    //   },
    //   {
    //     name: "Transistor",
    //     value: "transistor"
    //   },
    //   {
    //     name: "Diode",
    //     value: "diode"
    //   },
    //   {
    //     name: "IC",
    //     value: "ic"
    //   },
    //   {
    //     name: "Switch",
    //     value: "switch"
    //   },
    //   {
    //     name: "Jack",
    //     value: "jack"
    //   },
    //   {
    //     name: "Potentiometer",
    //     value: "pot"
    //   },
    //   {
    //     name: "Hardware",
    //     value: "hardware"
    //   },
    //   {
    //     name: "Miscellaneous",
    //     value: "misc"
    //   }
    // ]);
    return this.jsonRequest(user, "/metadata/components", "GET");
  }

  getComponentMetadata(user, componentType) {}
}

export default ComponentMetadataService;
