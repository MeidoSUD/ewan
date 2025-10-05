import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from './DashboardLayout';

const ProtectedRoute: React.FC<{ allowedRoles?: string[] }> = ({ allowedRoles }) => {
  const location = useLocation();
  const { user, token, logout, login } = useAuth() as any;
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(user || null);

  useEffect(() => {
    let mounted = true;
    async function ensureProfile() {
      const localToken = token || localStorage.getItem('auth_token');
      if (!localToken) return;
      if (profile) return;
      setLoading(true);
      try {
        const p = await api.getProfile(localToken);
        if (!mounted) return;
        setProfile(p);
        // persist into AuthContext by calling login shape (not ideal but acceptable)
        // We call useAuth.login? skip calling here to avoid loops; assume AuthContext synced on startup.
      } catch (err) {
        // invalid token: clear and redirect to login
        await logout();
      } finally {
        setLoading(false);
      }
    }
    ensureProfile();
    return () => { mounted = false; };
  }, []);

  const localToken = token || localStorage.getItem('auth_token');
  if (!localToken) return <Navigate to="/login" replace state={{ from: location }} />;
  if (loading) return <div className="p-8">Loading...</div>;

  const role = (profile && profile.role) || (user && user.role) || null;
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <div className="p-8">Not authorized</div>;
  }

  // Use DashboardLayout to wrap children when route is under /dashboard
  const inDashboard = location.pathname.startsWith('/dashboard');

  if (inDashboard) {
    return (
      <DashboardLayout userRole={role}>
        <Outlet />
      </DashboardLayout>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
