import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogInStore } from '../../store/stores';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loged } = useLogInStore();
    
  if (loged) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;