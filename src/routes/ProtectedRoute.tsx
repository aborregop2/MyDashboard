import { ReactElement } from 'react';
import { Navigate } from 'react-router';

import { useAuthStore } from '../store/index';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;