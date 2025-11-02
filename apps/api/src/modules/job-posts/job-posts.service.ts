import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateJobpostDto, JobpostResponseDto, UpdateJobpostDto } from '@saas-template/core';
import type { Jobpost } from '@saas-template/database';
import { JobpostsRepository } from './jobposts.repository';

@Injectable()
export class JobpostsService {
  constructor(
    private readonly jobpostsRepository: JobpostsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<JobpostResponseDto[]> {
    const jobposts = await this.jobpostsRepository.findAll(userId);
    return jobposts.map((jobpost: Jobpost) => this.toResponseDto(jobpost));
  }

  async findOne(id: string, userId: string): Promise<JobpostResponseDto> {
    const jobpost = await this.jobpostsRepository.findById(id, userId);
    if (!jobpost) {
      throw new NotFoundException('Jobpost not found');
    }
    return this.toResponseDto(jobpost);
  }

  async create(userId: string, dto: CreateJobpostDto): Promise<JobpostResponseDto> {
    return this.uow.execute(async () => {
      const jobpost = await this.jobpostsRepository.create(userId, dto);
      return this.toResponseDto(jobpost);
    });
  }

  async update(id: string, userId: string, dto: UpdateJobpostDto): Promise<JobpostResponseDto> {
    return this.uow.execute(async () => {
      const jobpost = await this.jobpostsRepository.update(id, userId, dto);
      if (!jobpost) {
        throw new NotFoundException('Jobpost not found');
      }
      return this.toResponseDto(jobpost);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.jobpostsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Jobpost not found');
      }
    });
  }

  private toResponseDto(jobpost: Jobpost): JobpostResponseDto {
    return {
      id: jobpost.id,
      title: jobpost.title,
      description: jobpost.description,
      company: jobpost.company,
      location: jobpost.location,
      status: jobpost.status,
      recruiterId: jobpost.recruiterId,
      createdAt: jobpost.createdAt,
      updatedAt: jobpost.updatedAt,
    };
  }
}
