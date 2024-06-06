import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import io from 'socket.io-client';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { login, logout } from '../store/auth/authSlice';
import { authService } from '../services/auth.service';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';
import { useAppDispatch } from '../store/hooks';

const Layout: FC = () => {
  const isAuth = useAuth();

  if (isAuth) {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      autoConnect: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
    });
    socket.on('connect', () => {
      console.log('socket connected');
    });
  }

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    checkAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isAuth && <Header />}

      <Container component="main" maxWidth="xl" sx={{ mt: { xs: 0, sm: 8 } }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
