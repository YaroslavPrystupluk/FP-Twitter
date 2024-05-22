import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { pages } from '../../helpers/pointMenu.helpers';

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
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#7fbaf5' : '#ffffff',
            margin: '0 7px',
            textTransform: 'uppercase',
            fontSize: '14px',
          })}
        >
          {page}
        </NavLink>
      ))}
    </Box>
  );
};

export default HeaderMenu;
