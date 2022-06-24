import { NextFunction, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { User } from "../db/entities";
import { AuthenticationError } from "../modules/common/exception-handlers.common";
import { IRequest } from "../types";

const { JWTSECRET: JWTSecret } = process.env;

export class AuthMiddleware {
  static async authenticate(req: IRequest, res: Response, next: NextFunction) {
    const [status, label, token] = AuthMiddleware.extractAuthHeader(req.headers);
    try {
      if (!status) {
        throw new AuthenticationError({ message: "Auth Header not passed" });
      }

      if (!((label as unknown as string) === "Bearer")) {
        throw new AuthenticationError({ message: "Invalid auth label" });
      }
      const payload = await User.verifyJWT(token as unknown as string, JWTSecret!);
      req.userId = payload.userId;
      req.userEmail = payload.email;

      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
        const err = new AuthenticationError({ message: "Invalid Access Token" });
        return next(err);
      }
      next(error);
    }
  }

  private static extractAuthHeader(headers: IncomingHttpHeaders) {
    const tag = "authorization";
    if (!Object.keys(headers).includes(tag)) return [false, null, null];
    const [label, token] = headers.authorization!.split(" ");
    return [true, label, token];
  }

  authorize(PermittedRoles: Array<string>): void {
    return;
  }
}
