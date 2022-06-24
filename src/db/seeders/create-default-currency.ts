import { Currency } from "../entities";
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";

export default class CreateDefaultCurrency implements Seeder {
  async run(_factory: Factory, connection: DataSource): Promise<void> {
    const currencyRepository = connection.manager.getRepository(Currency);
    const unsavedCurrecncy = currencyRepository.create({ name: "naira", code: "NGN", symbol: "U+20A6" });
    await currencyRepository.save(unsavedCurrecncy);
  }
}
