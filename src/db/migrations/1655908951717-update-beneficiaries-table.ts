import { MigrationInterface, QueryRunner } from "typeorm";

export class updateBeneficiariesTable1655908951717 implements MigrationInterface {
    name = 'updateBeneficiariesTable1655908951717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3000dad1da61b29953f0747632\` ON \`accounts\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD \`source_id\` int NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD \`target_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD PRIMARY KEY (\`source_id\`, \`target_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD PRIMARY KEY (\`source_id\`)`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP COLUMN \`target_id\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` DROP COLUMN \`source_id\``);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`beneficiaries\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3000dad1da61b29953f0747632\` ON \`accounts\` (\`user_id\`)`);
    }

}
