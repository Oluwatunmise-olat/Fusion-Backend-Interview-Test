import { Request, Response, NextFunction } from "express";
import { Response as apiResponse } from "../modules/common/response.common";
import {
  AuthenticationError,
  BodyFieldError,
  ResourceNotFoundError,
  ServerError,
} from "../modules/common/exception-handlers.common";

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BodyFieldError) {
    return res.status(error.statusCode).json(apiResponse.error(error.message, error.data));
  }

  if (error instanceof ResourceNotFoundError) {
    return res.status(error.statusCode).json(apiResponse.error(error.message, error.data));
  }

  if (error instanceof AuthenticationError) {
    const data = typeof error.data === "object" ? [error.data] : error.data;
    return res.status(error.statusCode).json(apiResponse.error(error.message, data));
  }

  if (error instanceof ServerError) {
    return res.status(error.statusCode).json(apiResponse.error(error.message, [{ message: error.message }]));
  }
};

export default errorHandler;
