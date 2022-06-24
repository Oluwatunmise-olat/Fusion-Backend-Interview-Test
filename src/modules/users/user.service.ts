import { QueryFailedError } from "typeorm";
import { DBSource } from "../../db/data-source";
import { Currency, User } from "../../db/entities";
import { IServiceResponse } from "../../types";
import { AccountService } from "../accounts/account.service";
import { BodyFieldError, ServerError } from "../common/exception-handlers.common";

export class UserService {
  private static userRepository = DBSource.getRepository(User);
  private static accountService = AccountService;
  private static currencyRepository = DBSource.getRepository(Currency);
  private static JWTSecret = process.env.JWTSECRET;
  private static readonly queryRunner = DBSource.createQueryRunner();

  static async create(payload: any): Promise<IServiceResponse> {
    // TODO::abstract db transaction logic
    payload.password = await User.hashPassword(payload.password);

    const unsavedUser = this.userRepository.create({ ...payload, type: "user" });
    try {
      await this.queryRunner.connect();

      const tempUserRepository = await this.queryRunner.manager.getRepository(User);
      const tempCurrencyRepository = await this.queryRunner.manager.getRepository(Currency);

      await this.queryRunner.startTransaction();

      const savedUser = await tempUserRepository.save(unsavedUser);
      const user: any = Object.keys(savedUser).reduce((acc: any, curr: any) => {
        if (curr !== "password") return { ...acc, [curr]: savedUser[curr] };
      }, {});

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const defaultCurrency = (await tempCurrencyRepository.findOne({ where: { code: "NGN" } }))!;
      await this.accountService.create({ userId: user.id, currencyId: defaultCurrency.id }, this.queryRunner);
      await this.queryRunner.commitTransaction();

      return { hasError: false, message: "success", data: user };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BodyFieldError([{ message: "Email Taken" }], "Validation Error");
      }
      await this.queryRunner.rollbackTransaction();
      throw new ServerError();
    }
  }

  static async logIn(payload: { email: string; password: string }): Promise<IServiceResponse> {
    try {
      const userExists = await this.userRepository.findOne({ where: { email: payload.email } });

      if (!userExists || !(await User.checkPassword(payload.password, userExists.password)))
        return { hasError: true, message: "Invalid Credentials", data: {} };

      const { password, ...user } = userExists;
      const accessToken = await User.generateJWT({ userId: user.id, email: user.email }, this.JWTSecret!);

      return { hasError: false, message: "User Login Success", data: { ...user, access_token: accessToken } };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async getAll(): Promise<IServiceResponse> {
    try {
      const data = await this.userRepository.find({
        select: ["first_name", "last_name", "email", "created_at", "update_at", "id", "is_email_verified", "type"],
      });
      return { hasError: false, message: "Success", data };
    } catch (error) {
      throw new ServerError();
    }
  }

  //   getProfile() {}
}
