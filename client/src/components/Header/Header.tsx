import { FC } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { HeaderBuegerMenu, HeaderMenu, HeaderProfileMenu, Seaech } from '.';

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FlutterDashIcon
            fontSize="large"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'pre-line',
            }}
          >
            clone twitter
          </Typography>

          <HeaderBuegerMenu />
          <FlutterDashIcon
            fontSize="large"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'pre-line',
            }}
          >
            clone twitter
          </Typography>
          <>
            <HeaderMenu />
            <Seaech />
            <HeaderProfileMenu />
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
