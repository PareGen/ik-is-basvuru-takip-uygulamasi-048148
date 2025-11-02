import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { JobPost } from './job-post.entity';
import type { User } from './user.entity';

@Entity({ name: 'applications' })
export class Application extends BaseEntity {
  @Column({ type: 'enum', enum: ['PENDING', 'INTERVIEW', 'REJECTED', 'HIRED'] })
  @Index('idx_applications_status')
  status!: 'PENDING' | 'INTERVIEW' | 'REJECTED' | 'HIRED';

  @Column({ type: 'timestamp with time zone', name: 'submitted_at' })
  submittedAt!: Date;


@Column({ name: 'applicant_id' })
  applicantId!: string;

  @Index('idx_applications_applicant_id')
  @ManyToOne('User', 'applications')
  @JoinColumn({ name: 'applicant_id' })
  user!: User;

  @Column({ name: 'job_post_id' })
  jobPostId!: string;

  @Index('idx_applications_job_post_id')
  @ManyToOne('JobPost', 'applications')
  @JoinColumn({ name: 'job_post_id' })
  jobPost!: JobPost;
}
