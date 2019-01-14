class JsonResponse<T> {
  readonly body: T;

  constructor(body: string) {
    this.body = JSON.parse(body);
  }
}

export default JsonResponse;
