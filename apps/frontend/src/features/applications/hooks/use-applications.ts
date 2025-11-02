import type { CreateApplicationDto, UpdateApplicationDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { applicationsService } from '../services';

const APPLICATION_KEY = ['applications'];

export function useApplications() {
  return useQuery({
    queryKey: APPLICATION_KEY,
    queryFn: () => applicationsService.getAll(),
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: [...APPLICATION_KEY, id],
    queryFn: () => applicationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationDto) => applicationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATION_KEY });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApplicationDto }) =>
      applicationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATION_KEY });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATION_KEY });
    },
  });
}
