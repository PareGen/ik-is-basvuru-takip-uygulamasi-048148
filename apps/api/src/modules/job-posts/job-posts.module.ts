import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobpost } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { JobpostsController } from './jobposts.controller';
import { JobpostsService } from './jobposts.service';
import { JobpostsRepository } from './jobposts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jobpost]),
    DatabaseModule,
  ],
  controllers: [JobpostsController],
  providers: [JobpostsService, JobpostsRepository],
  exports: [JobpostsService],
})
export class JobpostsModule {}
