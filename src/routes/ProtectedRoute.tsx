import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, Role } from '@/contexts/AuthContext';

const ProtectedRoute = ({ allowed }: { allowed?: Role[] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowed && user && !allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
