import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/index';

const ProtectedRoute = () => {

  const { user } = useAuthStore();
  console.log(user);

  return <Outlet /> ;

};


export default ProtectedRoute;