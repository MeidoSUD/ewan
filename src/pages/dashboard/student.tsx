import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

const Spinner = () => (
  <div className="flex items-center justify-center p-6">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const CourseCard = ({ course }: any) => (
  <div className="w-72 bg-white rounded-lg shadow p-4 flex-shrink-0">
    <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center">Image</div>
    <div className="text-xs text-muted-foreground mb-1">{course.category || 'General'}</div>
    <div className="font-semibold mb-2">{course.title || course.name || 'Course Title'}</div>
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-primary">${course.price ?? course.cost ?? 0}</div>
      <button className="px-3 py-1 text-sm rounded bg-primary text-white">تفاصيل</button>
    </div>
  </div>
);

const TeacherCard = ({ teacher }: any) => (
  <div className="bg-white rounded-lg shadow p-4 flex gap-3">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">Photo</div>
    <div className="flex-1">
      <div className="font-semibold">{teacher.name || teacher.full_name || 'Teacher Name'}</div>
      <div className="text-sm text-muted-foreground">{teacher.subject || teacher.specialty || 'Subject'}</div>
      <div className="mt-2 text-sm">Rating: {teacher.rating ?? '4.8'} · ${teacher.hourly_rate ?? teacher.price ?? 20}/hr</div>
      <div className="mt-1 text-xs text-muted-foreground">Available: {teacher.available_days ? teacher.available_days.join(', ') : 'Mon-Fri'}</div>
    </div>
  </div>
);

const ServiceCard = ({ service }: any) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-md mx-auto mb-3 flex items-center justify-center">I</div>
    <div className="font-semibold mb-1">{service.title || service.name || 'Service'}</div>
    <div className="text-sm text-muted-foreground">{service.description || 'Service description goes here.'}</div>
  </div>
);

const StudentDashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingProfile(true);
      try {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;
        const p = await api.getProfile(token || undefined);
        setProfile(p);
      } catch (err: any) {
        toast({ title: 'Profile error', description: err?.message || 'Failed to load profile', variant: 'destructive' });
      } finally {
        setLoadingProfile(false);
      }

      setLoadingData(true);
      try {
        const [c, t, s] = await Promise.all([api.getCourses(), api.getTeachers(), api.getServices()]);
        setCourses(Array.isArray(c) ? c : (c && c.data) || []);
        setTeachers(Array.isArray(t) ? t : (t && t.data) || []);
        setServices(Array.isArray(s) ? s : (s && s.data) || []);
      } catch (err: any) {
        toast({ title: 'Data error', description: err?.message || 'Failed to load dashboard data', variant: 'destructive' });
      } finally {
        setLoadingData(false);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{loadingProfile ? 'Welcome' : `Welcome, ${profile?.name || profile?.first_name || profile?.full_name || ''}`}</h1>
            <p className="text-sm text-muted-foreground">Your student dashboard</p>
          </div>
        </header>

        <section>
          <h2 className="text-lg font-semibold mb-3">Courses</h2>
          {loadingData ? (
            <Spinner />
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {courses.length ? courses.map((c: any) => <CourseCard key={c.id || c._id || c.name} course={c} />) : (
                <div className="text-muted-foreground">No courses available.</div>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Best Teachers</h2>
          {loadingData ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teachers.length ? teachers.map((t: any) => <TeacherCard key={t.id || t._id || t.name} teacher={t} />) : (
                <div className="text-muted-foreground">No teachers found.</div>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Our Services</h2>
          {loadingData ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.length ? services.map((s: any) => <ServiceCard key={s.id || s._id || s.title} service={s} />) : (
                <div className="text-muted-foreground">No services available.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
