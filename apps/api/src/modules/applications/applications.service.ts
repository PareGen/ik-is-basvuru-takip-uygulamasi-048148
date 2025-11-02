import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateApplicationDto, ApplicationResponseDto, UpdateApplicationDto } from '@saas-template/core';
import type { Application } from '@saas-template/database';
import { ApplicationsRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ApplicationResponseDto[]> {
    const applications = await this.applicationsRepository.findAll(userId);
    return applications.map((application: Application) => this.toResponseDto(application));
  }

  async findOne(id: string, userId: string): Promise<ApplicationResponseDto> {
    const application = await this.applicationsRepository.findById(id, userId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return this.toResponseDto(application);
  }

  async create(userId: string, dto: CreateApplicationDto): Promise<ApplicationResponseDto> {
    return this.uow.execute(async () => {
      const application = await this.applicationsRepository.create(userId, dto);
      return this.toResponseDto(application);
    });
  }

  async update(id: string, userId: string, dto: UpdateApplicationDto): Promise<ApplicationResponseDto> {
    return this.uow.execute(async () => {
      const application = await this.applicationsRepository.update(id, userId, dto);
      if (!application) {
        throw new NotFoundException('Application not found');
      }
      return this.toResponseDto(application);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.applicationsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Application not found');
      }
    });
  }

  private toResponseDto(application: Application): ApplicationResponseDto {
    return {
      id: application.id,
      applicantId: application.applicantId,
      jobPostId: application.jobPostId,
      status: application.status,
      submittedAt: application.submittedAt,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
    };
  }
}
