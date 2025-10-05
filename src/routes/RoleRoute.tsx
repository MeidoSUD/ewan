import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from '@/contexts/AuthContext';

const RoleRoute = ({ allowed }: { allowed: Role[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return allowed.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleRoute;
