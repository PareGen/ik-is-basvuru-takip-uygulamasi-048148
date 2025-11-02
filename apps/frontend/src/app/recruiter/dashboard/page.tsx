'use client';

import { useJobPosts } from '@/features/job-posts/hooks/use-job-posts';

export default function RecruiterDashboardPage() {
  const { data: jobPosts, isLoading } = useJobPosts();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
      <p className="text-muted-foreground mb-6">Dashboard for recruiters to manage job postings and applications.</p>
      
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
