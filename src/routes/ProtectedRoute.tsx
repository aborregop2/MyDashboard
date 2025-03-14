import { Navigate, Outlet } from 'react-router';

import { useAuthStore } from '../store/index';

const ProtectedRoute = () => {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;