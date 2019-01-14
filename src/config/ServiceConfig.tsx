class ServiceConfig {
  static SERVICE_URL = process.env.REACT_APP_SERVICE_URL;

  static url(path: string) {
    return (
      ServiceConfig.SERVICE_URL + (path.startsWith("/") ? path : "/" + path)
    );
  }
}

export default ServiceConfig;
