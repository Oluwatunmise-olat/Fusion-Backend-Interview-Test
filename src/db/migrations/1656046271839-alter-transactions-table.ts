import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTransactionsTable1656046271839 implements MigrationInterface {
    name = 'alterTransactionsTable1656046271839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`reference\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`reference\``);
    }

}
