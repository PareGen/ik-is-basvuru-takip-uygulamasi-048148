import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'job_posts' })
export class Jobpost extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  company!: string;

  @Column()
  location!: string;

  @Column({ type: 'enum', enum: ['OPEN', 'CLOSED', 'ARCHIVED'] })
  @Index('idx_job_posts_status')
  status!: 'OPEN' | 'CLOSED' | 'ARCHIVED';


@Column({ name: 'recruiter_id' })
  recruiterId!: string;

  @Index('idx_job_posts_recruiter_id')
  @ManyToOne('User', 'jobposts')
  @JoinColumn({ name: 'recruiter_id' })
  user!: User;
}
