import { Request, Response, NextFunction } from "express";
import { CurrencyService as currencyService } from "./currency.service";
import httpStatus from "http-status-codes";
import { Response as apiResponse } from "../common/response.common";

export class CurrencyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await currencyService.create(req.body);
      const { message, data } = resp;
      if (resp.hasError) return res.status(httpStatus.BAD_REQUEST).json(apiResponse.error(message, data));
      return res.status(httpStatus.CREATED).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { currency_Id } = req.params;
      const resp = await currencyService.getOne(parseInt(currency_Id));
      const { message, data } = resp;
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await currencyService.getAll();
      const { message, data } = resp;
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }
}
