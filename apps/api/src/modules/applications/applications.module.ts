import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsRepository } from './applications.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    DatabaseModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
