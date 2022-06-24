import { IErrorResponse, IResponse } from "../../types";

export class Response {
  static success(message: string, data?: object): IResponse {
    return { success: true, message, data };
  }

  static error(message: string, data: Array<{ message: string }>): IErrorResponse {
    return { success: false, message, data };
  }
}
