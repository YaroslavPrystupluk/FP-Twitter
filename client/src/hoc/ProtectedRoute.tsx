import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useAuth();

  const token = getTokenFromLocalStorage();

  if (!isAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
