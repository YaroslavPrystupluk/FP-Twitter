import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { pages } from '../../helpers/PointMenu';
import { NavLink } from 'react-router-dom';

const HeaderMenu: FC = () => {
  const [, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box
      component="nav"
      ml={2}
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
    >
      {pages.map((page) => (
        <NavLink
          to={page.toLowerCase()}
          key={page}
          onClick={handleCloseNavMenu}
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            margin: '0 10px',
            textTransform: 'uppercase',

          }}
        >
          {page}
        </NavLink>
      ))}
    </Box>
  );
};

export default HeaderMenu;
