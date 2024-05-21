import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { pages } from '../../helpers/PointMenu';



const HeaderBuegerMenu: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null,
  );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <NavLink
              to={page.toLowerCase()}
              onClick={handleCloseNavMenu}
              style={{
                textDecoration: 'none',
                margin: '0 10px',
                textTransform: 'uppercase',
              }}
            >
              {page}
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default HeaderBuegerMenu

