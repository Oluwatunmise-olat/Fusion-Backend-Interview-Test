import httpStatus from "http-status-codes";

export class ServerError extends Error {
  public statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  public name = "Internal Server Error";

  constructor(message = "Internal Server Error") {
    super(message);
  }
}

export class ResourceNotFoundError<T> extends Error {
  public statusCode = httpStatus.NOT_FOUND;
  public name = "Not Found Error";
  public data?: T | [] = [];

  constructor(message: string, data?: T) {
    super(message);
    if (data) this.data = data;
  }
}

export class BodyFieldError<T> extends Error {
  public statusCode = httpStatus.BAD_REQUEST;
  public name = "Body Field Error";
  public data: T;

  constructor(data: T, message = "Body Field Error") {
    super(message);
    this.data = data;
  }
}

export class NotPermittedError<T> extends Error {
  public data: T;
  public statusCode = httpStatus.FORBIDDEN;

  constructor(data: T) {
    super("Not Permitted");
    this.data = data;
  }
}

export class AuthenticationError<T> extends Error {
  public statusCode = httpStatus.UNAUTHORIZED;
  public data: T;

  constructor(data: T) {
    super("Authentication Error");
    this.data = data;
  }
}
