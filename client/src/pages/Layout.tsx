import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { useAuth } from '../hooks/useAuth';

const Layout: FC = () => {
  const isAuth = useAuth();
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
