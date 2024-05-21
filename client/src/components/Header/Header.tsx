import { FC } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { HeaderBuegerMenu, HeaderMenu, HeaderProfileMenu, Seaech } from '.';

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderBuegerMenu />
          <FlutterDashIcon fontSize="large" sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'monospace',
              fontWeight: { md: 500, lg: 700 },
              letterSpacing: { sm: '.2rem', lg: '.3rem' },
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'pre-line',
              flexGrow: { xs: 1, md: 0 },
              textTransform: 'uppercase',
            }}
          >
            clone twitter
          </Typography>
          <HeaderMenu />
          <Seaech />
          <HeaderProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
