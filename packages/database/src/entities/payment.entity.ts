import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'FAILED'] })
  @Index('idx_payments_status')
  status!: 'PENDING' | 'COMPLETED' | 'FAILED';


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_payments_user_id')
  @ManyToOne('User', 'payments')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
