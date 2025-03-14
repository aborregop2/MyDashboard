import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuthStore } from '../store/index';

interface ProtectedRouteProps {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;