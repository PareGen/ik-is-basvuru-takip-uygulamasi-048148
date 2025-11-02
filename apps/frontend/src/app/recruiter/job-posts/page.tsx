'use client';

import { useJobPosts } from '@/features/job-posts/hooks/use-job-posts';

export default function JobPostingManagementPage() {
  const { data: jobPosts, isLoading } = useJobPosts();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Job Posting Management</h1>
      <p className="text-muted-foreground mb-6">Interface for recruiters to create, edit, and delete job postings.</p>
      
      <div className="grid gap-4">
        {jobPosts?.map((jobPost: any) => (
          <div key={jobPost.id} className="border rounded p-4">
            <pre>{JSON.stringify(jobPost, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
