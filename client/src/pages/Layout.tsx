import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { login, logout } from '../store/user/userSlice';
import { authService } from '../services/auth.service';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';
import { useAppDispatch } from '../store/hooks';

const Layout: FC = () => {
  const isAuth = useAuth();
  console.log('loyat:',isAuth);
  
    const dispatch = useAppDispatch();

    
    useEffect(() => {
      const checkAuth = async () => {
        const token = getTokenFromLocalStorage();
        try {
          if (token) {
            const data = await authService.getProfile();
            if (data) {
              dispatch(login(data));
            } else {
              dispatch(logout());
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          const error = err.response?.data.message;

          toast.error(error.toString());
        }
      };

      checkAuth();
    }, [dispatch]);
  return (
    <>
      {isAuth && <Header />}

      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
