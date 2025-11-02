import { api } from '@/lib/api';
import type { JobpostResponseDto, CreateJobpostDto, UpdateJobpostDto } from '@saas-template/core';

export const jobpostsService = {
  async getAll(): Promise<JobpostResponseDto[]> {
    const response = await api.get('/jobposts');
    return response.data;
  },

  async getById(id: string): Promise<JobpostResponseDto> {
    const response = await api.get(`/jobposts/${id}`);
    return response.data;
  },

  async create(data: CreateJobpostDto): Promise<JobpostResponseDto> {
    const response = await api.post('/jobposts', data);
    return response.data;
  },

  async update(id: string, data: UpdateJobpostDto): Promise<JobpostResponseDto> {
    const response = await api.put(`/jobposts/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/jobposts/${id}`);
  },
};
