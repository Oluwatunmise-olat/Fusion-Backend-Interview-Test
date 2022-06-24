import { NextFunction, Request, Response as ExpressResponse } from "express";
import Joi from "joi";
import httpStatus from "http-status-codes";
import { Response as apiResponse } from "../modules/common/response.common";

export class RequestBodyDataMiddleware {
  static validate(schema: Joi.AnySchema) {
    return (req: Request, res: ExpressResponse, next: NextFunction) => {
      const { error, value: _ } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error === undefined) return next();

      const formattedErrResponse = this.formatError(error.details);

      return res.status(httpStatus.BAD_REQUEST).json(apiResponse.error("Validation Error", formattedErrResponse));
    };
  }

  private static formatError(errorArr: Array<Joi.ValidationErrorItem>) {
    return errorArr.map((errorObj) => {
      return { message: errorObj.message };
    });
  }
}
