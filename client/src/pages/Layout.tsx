import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

const Layout: FC = () => {
  const isAuth = false;
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
