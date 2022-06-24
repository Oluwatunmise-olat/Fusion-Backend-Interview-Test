import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTransactionsTable1656045835524 implements MigrationInterface {
    name = 'alterTransactionsTable1656045835524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`gateway\` \`gateway\` enum ('paystack', 'flutterwave', 'monnify', 'wallet') NOT NULL DEFAULT 'paystack'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`gateway\` \`gateway\` enum ('paystack', 'flutterwave', 'monnify') NOT NULL DEFAULT 'paystack'`);
    }

}
