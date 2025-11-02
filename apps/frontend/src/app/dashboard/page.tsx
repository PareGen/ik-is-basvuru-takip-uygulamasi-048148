'use client';

import { useApplications } from '@/features/applications/hooks/use-applications';

export default function ApplicantDashboardPage() {
  const { data: applications, isLoading } = useApplications();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Applicant Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main dashboard for applicants to manage their applications.</p>
      
      <div className="grid gap-4">
        {applications?.map((application: any) => (
          <div key={application.id} className="border rounded p-4">
            <pre>{JSON.stringify(application, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
