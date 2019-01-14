class ErrorResponse {
  readonly code: string;
  readonly body: string;

  constructor(code: string, body: string) {
    this.code = code;
    this.body = body;
  }
}

export default ErrorResponse;
