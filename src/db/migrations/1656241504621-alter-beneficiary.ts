import { MigrationInterface, QueryRunner } from "typeorm";

export class alterBeneficiary1656241504621 implements MigrationInterface {
    name = 'alterBeneficiary1656241504621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD \`sourceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD \`targetId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD CONSTRAINT \`FK_11099ae3a616c639d337b9723a3\` FOREIGN KEY (\`sourceId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD CONSTRAINT \`FK_3e3b3cbbb1461ce1fd93523198d\` FOREIGN KEY (\`targetId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP FOREIGN KEY \`FK_3e3b3cbbb1461ce1fd93523198d\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP FOREIGN KEY \`FK_11099ae3a616c639d337b9723a3\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP COLUMN \`targetId\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP COLUMN \`sourceId\``);
    }

}
