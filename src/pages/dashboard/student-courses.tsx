import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const StudentCourses = () => {
  return (
    <DashboardLayout userRole="student">
      <div>
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <p className="text-muted-foreground">List of enrolled courses (dummy content).</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">Course 1 (dummy)</div>
          <div className="bg-white rounded-lg shadow p-4">Course 2 (dummy)</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;
