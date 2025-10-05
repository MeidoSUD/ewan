import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const StudentPrivateLessons = () => {
  return (
    <DashboardLayout userRole="student">
      <div>
        <h1 className="text-2xl font-semibold">Private Lessons</h1>
        <p className="text-muted-foreground">Manage your private lessons (dummy content).</p>

        <div className="mt-4 space-y-3">
          <div className="bg-white rounded-lg shadow p-4">Upcoming Lesson 1 (dummy)</div>
          <div className="bg-white rounded-lg shadow p-4">Upcoming Lesson 2 (dummy)</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentPrivateLessons;
