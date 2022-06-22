import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCurrencyTable1655904834278 implements MigrationInterface {
    name = 'updateCurrencyTable1655904834278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD \`symbol\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP COLUMN \`symbol\``);
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP COLUMN \`name\``);
    }

}
