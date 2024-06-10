import { FC } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import {
  HeaderBuegerMenu,
  HeaderMenu,
  HeaderProfileMenu,
  SearchComponent,
} from '.';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <HeaderBuegerMenu />
          <FlutterDashIcon fontSize="large" sx={{ display: 'flex', mr: 1 }} />
          <Link
            to="/posts"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="h6"
              noWrap
              component="span"
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
          </Link>
          <HeaderMenu />
          <SearchComponent />
          <HeaderProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
