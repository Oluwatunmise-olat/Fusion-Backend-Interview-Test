import { DBSource } from "../src/db/data-source";
import { Currency } from "../src/db/entities";

beforeAll(async () => {
  await DBSource.initialize();
  const currencyRepository = DBSource.getRepository(Currency);
  const unsavedCurr = currencyRepository.create({ name: "naira", code: "NGN", symbol: "U+20A6" });
  await currencyRepository.save(unsavedCurr);
});

afterAll(async () => {
  const dbEntities = DBSource.entityMetadatas;
  for (let e of dbEntities) {
    try {
      await DBSource.manager.query(`SET FOREIGN_KEY_CHECKS = 0;`);
      await DBSource.manager.query(
        `
        TRUNCATE TABLE ${e.tableName};
      `,
      );
      await DBSource.manager.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    } catch (error) {
      console.log(error);
    }
  }

  await DBSource.destroy();
});
