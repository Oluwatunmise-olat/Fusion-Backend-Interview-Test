import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTableUserAddColPassword1655920444791 implements MigrationInterface {
    name = 'updateTableUserAddColPassword1655920444791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    }

}
