import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreatePaymentTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'COMPLETED', 'FAILED'],
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
      'payments',
      new TableForeignKey({
        name: 'fk_payments_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'payments',
      new TableIndex({
        name: 'idx_payments_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'payments',
      new TableIndex({
        name: 'idx_payments_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'payments',
      new TableIndex({
        name: 'idx_payments_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('payments', 'idx_payments_user_id');
    await queryRunner.dropIndex('payments', 'idx_payments_status');
    await queryRunner.dropForeignKey('payments', 'fk_payments_user_id');
    await queryRunner.dropTable('payments');
  }
}
