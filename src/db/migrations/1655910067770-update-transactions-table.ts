import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTransactionsTable1655910067770 implements MigrationInterface {
  name = "updateTransactionsTable1655910067770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD \`status\` enum ('successful', 'pending', 'cancelled') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`account_id\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`currency_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_49c0d6e8ba4bfb5582000d851f0\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_b515faccedf1dc36ac4f78acc04\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_b515faccedf1dc36ac4f78acc04\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_49c0d6e8ba4bfb5582000d851f0\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`currency_id\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`account_id\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`status\``);
  }
}
