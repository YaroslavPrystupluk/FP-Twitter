import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/auth/authSlice';
import { removeTokenFromLocalStorage } from '../../helpers/localStorage.helpers';
import { toast } from 'react-toastify';
import { authService } from '../../services/auth.service';

const HeaderProfileMenu: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const user = userState.user;

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());

    removeTokenFromLocalStorage('accessToken');
    toast.success('Logout was successful!');
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.displayname} src={user?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <NavLink
            to="/profile"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              textTransform: 'uppercase',
            }}
          >
            Profile
          </NavLink>

          <NavLink
            to="/edit-profile"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              textTransform: 'uppercase',
            }}
          >
            Edit profile
          </NavLink>

          <NavLink
            onClick={handleLogout}
            to="/login"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              textTransform: 'uppercase',
            }}
          >
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderProfileMenu;
