import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store';

const ProtectedRoute = () => {

  const {user}  = useAuthStore();


  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet /> ;

};


export default ProtectedRoute;