import { MigrationInterface, QueryRunner } from "typeorm";

export class updateAccountTable1655905700704 implements MigrationInterface {
    name = 'updateAccountTable1655905700704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD UNIQUE INDEX \`IDX_3000dad1da61b29953f0747632\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`currency_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3000dad1da61b29953f0747632\` ON \`accounts\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_3000dad1da61b29953f07476324\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_2b0d7a85ef19e9882a0e6587d8c\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_2b0d7a85ef19e9882a0e6587d8c\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_3000dad1da61b29953f07476324\``);
        await queryRunner.query(`DROP INDEX \`REL_3000dad1da61b29953f0747632\` ON \`accounts\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`currency_id\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP INDEX \`IDX_3000dad1da61b29953f0747632\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`user_id\``);
    }

}
