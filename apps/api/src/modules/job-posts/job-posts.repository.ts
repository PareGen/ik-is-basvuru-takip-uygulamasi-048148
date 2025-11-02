import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Jobpost } from '@saas-template/database';
import type { CreateJobpostDto, UpdateJobpostDto } from '@saas-template/core';

@Injectable()
export class JobpostsRepository extends Repository<Jobpost> {
  constructor(private dataSource: DataSource) {
    super(Jobpost, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Jobpost[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Jobpost | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateJobpostDto): Promise<Jobpost> {
    const jobpost = this.create({
      ...dto,
      userId,
    });
    return this.save(jobpost);
  }

  async update(id: string, userId: string, dto: UpdateJobpostDto): Promise<Jobpost | null> {
    const jobpost = await this.findById(id, userId);
    if (!jobpost) {
      return null;
    }

    Object.assign(jobpost, dto);
    return this.save(jobpost);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const jobpost = await this.findById(id, userId);
    if (!jobpost) {
      return false;
    }

    await this.softRemove(jobpost);
    return true;
  }
}
