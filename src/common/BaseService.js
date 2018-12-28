import ServiceConfig from "../config/ServiceConfig";

class BaseService {
  async request(user, path, verb, body, contentType) {
    let userToken = user.getIdToken();
    var requestConfig = {
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
        result = {
          error: {
            code: "HTTP_STATUS",
            body: response.status
          }
        };
      } else {
        result = {
          body: response.json()
        };
      }
    } catch (e) {
      result = {
        error: {
          code: "HTTP_REQUEST",
          body: e
        }
      };
    }

    return result;
  }

  async jsonRequest(user, path, verb, body) {
    return await this.request(user, path, verb, body, "application/json");
  }

  async multipartRequest(user, path, bodyKey, body, files) {
    var body = new FormData();
    body.append(bodyKey, body);
    for (var file of files) {
      body.append("buildDocs[]", file, file.name);
    }
    return await this.request(user, path, "POST", body, "multipart/form-data");
  }
}

export default BaseService;
