import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateApplicationTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'applications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'applicant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'job_post_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'INTERVIEW', 'REJECTED', 'HIRED'],
            isNullable: false,
          },
          {
            name: 'submitted_at',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        name: 'fk_applications_applicant_id',
        columnNames: ['applicant_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        name: 'fk_applications_job_post_id',
        columnNames: ['job_post_id'],
        referencedTableName: 'job_posts',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'applications',
      new TableIndex({
        name: 'idx_applications_applicant_id',
        columnNames: ['applicant_id'],
      })
    );

    await queryRunner.createIndex(
      'applications',
      new TableIndex({
        name: 'idx_applications_applicant_id',
        columnNames: ['applicant_id'],
      })
    );

    await queryRunner.createIndex(
      'applications',
      new TableIndex({
        name: 'idx_applications_job_post_id',
        columnNames: ['job_post_id'],
      })
    );

    await queryRunner.createIndex(
      'applications',
      new TableIndex({
        name: 'idx_applications_job_post_id',
        columnNames: ['job_post_id'],
      })
    );

    await queryRunner.createIndex(
      'applications',
      new TableIndex({
        name: 'idx_applications_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('applications', 'idx_applications_applicant_id');
    await queryRunner.dropIndex('applications', 'idx_applications_job_post_id');
    await queryRunner.dropIndex('applications', 'idx_applications_status');
    await queryRunner.dropForeignKey('applications', 'fk_applications_applicant_id');
    await queryRunner.dropForeignKey('applications', 'fk_applications_job_post_id');
    await queryRunner.dropTable('applications');
  }
}
