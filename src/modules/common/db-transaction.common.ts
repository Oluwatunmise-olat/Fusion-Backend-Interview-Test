import { DataSource } from "typeorm";

export class BaseTransaction {
  constructor(private readonly connection: DataSource) {}

  private async createRunner() {
    return this.connection.createQueryRunner();
  }
  async run<T>(data: T) {
    const queryRunner = await this.createRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  }
}
