import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateJobpostTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'job_posts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['OPEN', 'CLOSED', 'ARCHIVED'],
            isNullable: false,
          },
          {
            name: 'recruiter_id',
            type: 'uuid',
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
      'job_posts',
      new TableForeignKey({
        name: 'fk_job_posts_recruiter_id',
        columnNames: ['recruiter_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'job_posts',
      new TableIndex({
        name: 'idx_job_posts_status',
        columnNames: ['status'],
      })
    );

    await queryRunner.createIndex(
      'job_posts',
      new TableIndex({
        name: 'idx_job_posts_recruiter_id',
        columnNames: ['recruiter_id'],
      })
    );

    await queryRunner.createIndex(
      'job_posts',
      new TableIndex({
        name: 'idx_job_posts_recruiter_id',
        columnNames: ['recruiter_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('job_posts', 'idx_job_posts_status');
    await queryRunner.dropIndex('job_posts', 'idx_job_posts_recruiter_id');
    await queryRunner.dropForeignKey('job_posts', 'fk_job_posts_recruiter_id');
    await queryRunner.dropTable('job_posts');
  }
}
