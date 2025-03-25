import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

  const user = localStorage.userStorage;

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet /> ;

};


export default ProtectedRoute;