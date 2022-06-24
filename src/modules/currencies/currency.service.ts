import { QueryFailedError } from "typeorm";
import { DBSource } from "../../db/data-source";
import { Currency } from "../../db/entities";
import { IServiceResponse } from "../../types";
import { BodyFieldError, ResourceNotFoundError, ServerError } from "../common/exception-handlers.common";

export class CurrencyService {
  private static currRepository = DBSource.getRepository(Currency);

  static async create(payload: { name: string; symbol: string; code: string }): Promise<IServiceResponse> {
    const unsavedCurrency = this.currRepository.create(payload);
    try {
      const savedCurrency = await this.currRepository.save(unsavedCurrency);
      return { hasError: false, message: "Success", data: savedCurrency };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BodyFieldError({ message: "Validation Error" }, "Currency with given payload already exists");
      }
      throw new ServerError();
    }
  }

  static async getAll(): Promise<IServiceResponse> {
    try {
      // add pagination
      const [allCurrencies, count] = await this.currRepository.findAndCount({});
      return { hasError: false, message: "Success", data: { count, currencies: allCurrencies } };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async getOne(currencyId: number): Promise<IServiceResponse> {
    try {
      const currency = await this.currRepository.findOneBy({ id: currencyId });
      if (!currency) throw new ResourceNotFoundError("Resource Not Found", {});
      return { hasError: false, message: "Success", data: currency };
    } catch (error) {
      throw new ServerError();
    }
  }
}
