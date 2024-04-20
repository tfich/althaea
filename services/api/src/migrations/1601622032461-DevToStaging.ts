import { MigrationInterface, QueryRunner } from 'typeorm'

export class DevToStaging1601622032461 implements MigrationInterface {
  name = 'DevToStaging1601622032461'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bot_plans" ADD "hierarchy" integer NOT NULL DEFAULT 0')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bot_plans" DROP COLUMN "hierarchy"')
  }
}
