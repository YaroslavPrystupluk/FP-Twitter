import React, { FC, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { profileService } from '../../services/profile.service';
import { useAppDispatch } from '../../store/hooks';
import { deleteProfile, editProfile } from '../../store/profile/profileSlice';
import { logout } from '../../store/auth/authSlice';



const FormEditUser: FC = () => {
  const [displayname, setDisplayname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleEditProfile = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();
      const data = await profileService.editProfile(state.user.id, {
        displayname,
        password,
        confirmPassword,
      });

      dispatch(editProfile(data));
         toast.success('Profile updated!');
      navigate('/profile/' + state.id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const data = await profileService.deleteProfile(state.user.id);
      dispatch(deleteProfile(data));
      dispatch(logout());
      toast.success('Profile deleted!');
      navigate('/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="section"
        boxShadow={5}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1,
          border: '1px solid #E0E0E0',
          width: 400,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box>
            <FlutterDashIcon fontSize="large" color="primary" />
          </Box>
          <Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              clone twitter
            </Typography>
          </Box>
        </Box>
        <Typography textAlign="center" mb={2}>
          Edit profile user
        </Typography>
        <Box
          sx={{
            width: '35%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 4,
          }}
        ></Box>
        <Box
          component="form"
          onSubmit={handleEditProfile}
          sx={{ width: '100%' }}
        >
          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Display name <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setDisplayname(e.target.value)}
            fullWidth
            label="Display name"
            type="text"
            value={displayname}
          />

          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Password <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Password"
            type="password"
            value={password}
          />

          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Confirmed password <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            label="Confirmed password"
            type="password"
            value={confirmPassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, textTransform: 'none' }}
          >
            Change profile
          </Button>
          <Button
            onClick={handleDeleteProfile}
            fullWidth
            variant="contained"
            color="error"
            sx={{ marginTop: 2, textTransform: 'none' }}
          >
            Delete profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEditUser;
