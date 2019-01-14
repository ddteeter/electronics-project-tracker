import ServiceConfig from "../config/ServiceConfig";
import { User } from "firebase";
import JsonResponse from "./JsonResponse";
import ErrorResponse from "./ErrorResponse";

class BaseService {
  async request<T>(
    user: User,
    path: string,
    verb: string,
    body: string | FormData | undefined,
    contentType: string
  ): Promise<JsonResponse<T>> {
    let userToken = user.getIdToken();
    var requestConfig: RequestInit = {
      method: verb,
      cache: "no-cache",
      headers: {
        "Content-Type": contentType,
        Authorization: "Bearer " + userToken
      }
    };

    if (!!body) {
      if (contentType === "application/json") {
        requestConfig.body = JSON.stringify(body);
      } else {
        requestConfig.body = body;
      }
    }

    var result;
    try {
      let response = await fetch(ServiceConfig.url(path), requestConfig);
      if (response.status >= 400) {
        throw new ErrorResponse("HTTP_STATUS", response.status.toFixed(0));
      } else {
        result = new JsonResponse<T>(await response.text());
      }
    } catch (e) {
      throw new ErrorResponse("HTTP_REQUEST", e);
    }

    return result;
  }

  async jsonRequest<T>(
    user: User,
    path: string,
    verb: string,
    body: string | any | undefined = undefined
  ) {
    let jsonBody =
      typeof body === "string"
        ? body
        : body !== "undefined"
        ? JSON.stringify(body)
        : undefined;
    return await this.request<T>(
      user,
      path,
      verb,
      jsonBody,
      "application/json"
    );
  }

  async multipartRequest<T>(
    user: User,
    path: string,
    jsonBodyKey: string,
    body: any,
    files: FileList | null
  ): Promise<JsonResponse<T>> {
    var multipartBody = new FormData();
    multipartBody.append(
      jsonBodyKey,
      typeof body === "string" ? body : JSON.stringify(body)
    );
    if (files) {
      for (let file of Array.from(files)) {
        multipartBody.append("buildDocs[]", file, file.name);
      }
    }
    return await this.request(
      user,
      path,
      "POST",
      multipartBody,
      "multipart/form-data"
    );
  }
}

export default BaseService;
