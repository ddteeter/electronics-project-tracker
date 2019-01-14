import BaseService from "../../../common/BaseService";
import { User } from "firebase";
import ComponentType from "../model/ComponentType";
import JsonResponse from "../../../common/JsonResponse";
import ErrorResponse from "../../../common/ErrorResponse";

class ComponentMetadataService extends BaseService {
  async getComponentTypes(user: User): Promise<ComponentType[]> {
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
    let response: JsonResponse<ComponentType[]> = await this.jsonRequest(
      user,
      "/metadata/components",
      "GET"
    );

    return response.body;
  }
}

export default ComponentMetadataService;
