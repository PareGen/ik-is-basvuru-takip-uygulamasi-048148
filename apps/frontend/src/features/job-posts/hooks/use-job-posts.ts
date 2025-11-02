import type { CreateJobpostDto, UpdateJobpostDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobpostsService } from '../services';

const JOBPOST_KEY = ['jobposts'];

export function useJobposts() {
  return useQuery({
    queryKey: JOBPOST_KEY,
    queryFn: () => jobpostsService.getAll(),
  });
}

export function useJobpost(id: string) {
  return useQuery({
    queryKey: [...JOBPOST_KEY, id],
    queryFn: () => jobpostsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateJobpost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobpostDto) => jobpostsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBPOST_KEY });
    },
  });
}

export function useUpdateJobpost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobpostDto }) =>
      jobpostsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBPOST_KEY });
    },
  });
}

export function useDeleteJobpost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobpostsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBPOST_KEY });
    },
  });
}
