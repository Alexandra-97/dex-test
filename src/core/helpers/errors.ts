export enum Errors {
  badRequest = 400,
  unauthorizedError = 401,
  authError = 403,
  conflictError = 409,
}

export class CustomError extends Error {
  public code: number;

  constructor(code: number) {
    super();
    this.code = code;
  }
}
