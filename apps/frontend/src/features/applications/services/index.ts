import { api } from '@/lib/api';
import type { ApplicationResponseDto, CreateApplicationDto, UpdateApplicationDto } from '@saas-template/core';

export const applicationsService = {
  async getAll(): Promise<ApplicationResponseDto[]> {
    const response = await api.get('/applications');
    return response.data;
  },

  async getById(id: string): Promise<ApplicationResponseDto> {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  async create(data: CreateApplicationDto): Promise<ApplicationResponseDto> {
    const response = await api.post('/applications', data);
    return response.data;
  },

  async update(id: string, data: UpdateApplicationDto): Promise<ApplicationResponseDto> {
    const response = await api.put(`/applications/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/applications/${id}`);
  },
};
