import { ReactElement } from 'react';
import { Navigate } from 'react-router';

import { useLoginStore } from '../store/index';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useLoginStore();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;