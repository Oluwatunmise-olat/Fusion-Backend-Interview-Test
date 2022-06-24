import { NextFunction, Response } from "express";
import { Response as apiResponse } from "../common/response.common";
import httpStatus from "http-status-codes";

import { BeneficiariesService as beneficiaryService } from "./beneficiaries.service";
import { IRequest } from "../../types";

export class BeneficiariesController {
  static async add(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await beneficiaryService.add(req.body.email, req.userId!);

      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await beneficiaryService.remove(req.body.email, req.userId!);

      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { message, data } = await beneficiaryService.getAll(req.userId!);
      return res.status(httpStatus.OK).json(apiResponse.success(message, data));
    } catch (error) {
      next(error);
    }
  }
}
