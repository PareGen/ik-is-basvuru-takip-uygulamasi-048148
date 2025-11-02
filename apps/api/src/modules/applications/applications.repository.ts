import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Application } from '@saas-template/database';
import type { CreateApplicationDto, UpdateApplicationDto } from '@saas-template/core';

@Injectable()
export class ApplicationsRepository extends Repository<Application> {
  constructor(private dataSource: DataSource) {
    super(Application, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Application[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Application | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateApplicationDto): Promise<Application> {
    const application = this.create({
      ...dto,
      userId,
    });
    return this.save(application);
  }

  async update(id: string, userId: string, dto: UpdateApplicationDto): Promise<Application | null> {
    const application = await this.findById(id, userId);
    if (!application) {
      return null;
    }

    Object.assign(application, dto);
    return this.save(application);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const application = await this.findById(id, userId);
    if (!application) {
      return false;
    }

    await this.softRemove(application);
    return true;
  }
}
