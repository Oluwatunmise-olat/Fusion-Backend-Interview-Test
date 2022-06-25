import { MigrationInterface, QueryRunner } from "typeorm";

export class init1656117189676 implements MigrationInterface {
  name = "init1656117189676";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('user', 'admin') NOT NULL, \`email\` varchar(500) NOT NULL, \`last_name\` varchar(500) NOT NULL, \`first_name\` varchar(500) NOT NULL, \`email_verified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`currencies\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_976da6960ec4f0c96c26e3dffa\` (\`name\`), UNIQUE INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\` (\`code\`), UNIQUE INDEX \`IDX_30ed1fd0130c0874227d1817f2\` (\`symbol\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`beneficiaries\` (\`source_id\` int NOT NULL, \`target_id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`source_id\`, \`target_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`transactions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NULL, \`amount\` decimal NOT NULL, \`gateway\` enum ('paystack', 'flutterwave', 'monnify', 'wallet') NOT NULL DEFAULT 'paystack', \`type\` enum ('credit', 'transfer') NOT NULL, \`status\` enum ('successful', 'pending', 'cancelled') NOT NULL DEFAULT 'pending', \`reference\` varchar(255) NOT NULL, \`account_id\` int NULL, \`currency_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`currency_id\` int NULL, UNIQUE INDEX \`REL_3000dad1da61b29953f0747632\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_49c0d6e8ba4bfb5582000d851f0\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_b515faccedf1dc36ac4f78acc04\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_3000dad1da61b29953f07476324\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_2b0d7a85ef19e9882a0e6587d8c\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_2b0d7a85ef19e9882a0e6587d8c\``);
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_3000dad1da61b29953f07476324\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_b515faccedf1dc36ac4f78acc04\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_49c0d6e8ba4bfb5582000d851f0\``);
    await queryRunner.query(`DROP INDEX \`REL_3000dad1da61b29953f0747632\` ON \`accounts\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
    await queryRunner.query(`DROP TABLE \`transactions\``);
    await queryRunner.query(`DROP TABLE \`beneficiaries\``);
    await queryRunner.query(`DROP INDEX \`IDX_30ed1fd0130c0874227d1817f2\` ON \`currencies\``);
    await queryRunner.query(`DROP INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\` ON \`currencies\``);
    await queryRunner.query(`DROP INDEX \`IDX_976da6960ec4f0c96c26e3dffa\` ON \`currencies\``);
    await queryRunner.query(`DROP TABLE \`currencies\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
