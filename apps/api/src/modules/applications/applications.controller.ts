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
import type { CreateApplicationDto, ApplicationResponseDto, UpdateApplicationDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ApplicationResponseDto[]> {
    return this.applicationsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ApplicationResponseDto> {
    return this.applicationsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateApplicationDto,
    @CurrentUser() user: User
  ): Promise<ApplicationResponseDto> {
    return this.applicationsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
    @CurrentUser() user: User
  ): Promise<ApplicationResponseDto> {
    return this.applicationsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.applicationsService.remove(id, user.id);
  }
}
