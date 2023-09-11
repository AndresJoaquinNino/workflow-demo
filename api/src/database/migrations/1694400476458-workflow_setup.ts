import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowSetup1694400476458 implements MigrationInterface {
  name = 'WorkflowSetup1694400476458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`edge\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`reference\` varchar(255) NOT NULL,
                \`source\` varchar(255) NOT NULL,
                \`source_handle\` varchar(255) NOT NULL,
                \`target\` varchar(255) NOT NULL,
                \`target_handle\` varchar(255) NOT NULL,
                \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`deleted_at\` datetime(6) NULL,
                \`workflow_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`workflow\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`node\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`reference\` varchar(255) NOT NULL,
                \`text\` varchar(255) NOT NULL,
                \`position_x\` int NOT NULL,
                \`position_y\` int NOT NULL,
                \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`deleted_at\` datetime(6) NULL,
                \`node_type_id\` int NULL,
                \`workflow_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`node_shape\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_169a2c5074eb043514e5d700dd\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`node_type\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`node_shape_id\` int NULL,
                UNIQUE INDEX \`IDX_53562b28771b4d09996aa27c19\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_53562b28771b4d09996aa27c19\` ON \`node_type\`
        `);
    await queryRunner.query(`
            DROP TABLE \`node_type\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_169a2c5074eb043514e5d700dd\` ON \`node_shape\`
        `);
    await queryRunner.query(`
            DROP TABLE \`node_shape\`
        `);
    await queryRunner.query(`
            DROP TABLE \`node\`
        `);
    await queryRunner.query(`
            DROP TABLE \`workflow\`
        `);
    await queryRunner.query(`
            DROP TABLE \`edge\`
        `);
  }
}
