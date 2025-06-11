import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export function PrivateWrapper() {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export function PrivateWrapperForLogin() {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
