import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateJobpostDto, JobpostResponseDto, UpdateJobpostDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobpostsService } from './jobposts.service';

@Controller('jobposts')
@UseGuards(JwtAuthGuard)
export class JobpostsController {
  constructor(private readonly jobpostsService: JobpostsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<JobpostResponseDto[]> {
    return this.jobpostsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<JobpostResponseDto> {
    return this.jobpostsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateJobpostDto,
    @CurrentUser() user: User
  ): Promise<JobpostResponseDto> {
    return this.jobpostsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateJobpostDto,
    @CurrentUser() user: User
  ): Promise<JobpostResponseDto> {
    return this.jobpostsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.jobpostsService.remove(id, user.id);
  }
}
