import { NextFunction, Request, Response } from "express";
import { Response as apiResponse } from "../common/response.common";
import httpStatus from "http-status-codes";
import { UserService as userService } from "./user.service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const resp = await userService.create(body);
      const { message, data } = resp;
      if (resp.hasError) return res.status(httpStatus.BAD_REQUEST).json(apiResponse.error(message, data));
      return res.status(httpStatus.CREATED).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async logIn(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const resp = await userService.logIn(body);
      const { message, data } = resp;
      if (resp.hasError) return res.status(httpStatus.BAD_REQUEST).json(apiResponse.error(message, data));
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const { message, data } = await userService.getAll();
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(_req: Request, res: Response, next: NextFunction) {
    try {
      return null;
    } catch (error) {
      next(error);
    }
  }
}
