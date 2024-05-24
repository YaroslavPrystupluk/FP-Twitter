import { FC } from 'react';
// import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  // const location = useLocation();
  const isAuth = useAuth();
  console.log('ProtectedRoute: ', isAuth);

  if (!isAuth) {
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
