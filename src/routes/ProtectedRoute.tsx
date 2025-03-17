import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store';

const ProtectedRoute = () => {

  const store  = useAuthStore();

  console.log(store);

  /*if (!user) {
    return <Navigate to="/" replace />
  }*/

  return <Outlet /> ;

};


export default ProtectedRoute;