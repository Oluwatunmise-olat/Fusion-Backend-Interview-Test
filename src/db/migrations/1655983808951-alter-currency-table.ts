import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCurrencyTable1655983808951 implements MigrationInterface {
    name = 'alterCurrencyTable1655983808951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD UNIQUE INDEX \`IDX_976da6960ec4f0c96c26e3dffa\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD UNIQUE INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`currencies\` ADD UNIQUE INDEX \`IDX_30ed1fd0130c0874227d1817f2\` (\`symbol\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP INDEX \`IDX_30ed1fd0130c0874227d1817f2\``);
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\``);
        await queryRunner.query(`ALTER TABLE \`currencies\` DROP INDEX \`IDX_976da6960ec4f0c96c26e3dffa\``);
    }

}
