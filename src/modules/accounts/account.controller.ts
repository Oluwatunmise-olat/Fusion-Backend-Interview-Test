import { NextFunction, Response } from "express";
import { Response as apiResponse } from "../common/response.common";
import httpStatus from "http-status-codes";
import { IRequest } from "../../types";
import { AccountService as accountService } from "./account.service";

export class AccountController {
  static async getTransactions(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await accountService.getTransactions(req.userId!);
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await accountService.getAll();
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getBalance(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await accountService.getBalance(req.userId!);
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async performTransfer(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await accountService.transfer(req.body, req.userId!);
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async fund(req: IRequest, res: Response, next: NextFunction) {
    try {
      const resp = await accountService.verifyTransaction(req.body, req.userId!);
      const { message, data } = resp;
      if (resp.hasError) return res.status(httpStatus.BAD_REQUEST).json(apiResponse.error(message, data));
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async initializeFundingTransaction(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { data, message } = await accountService.initializeTransaction(req.body, req.userId!, req.userEmail!);
      return res.status(httpStatus.CREATED).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async paystackWebhook(req: IRequest, res: Response, next: NextFunction) {
    try {
      await accountService.webhook(req.body, req.headers);
      return res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}
