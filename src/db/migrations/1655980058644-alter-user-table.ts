import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1655980058644 implements MigrationInterface {
    name = 'alterUserTable1655980058644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_verified\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_verified\` tinyint NOT NULL DEFAULT '0'`);
    }

}
