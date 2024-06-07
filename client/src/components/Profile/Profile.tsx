import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authService } from '../../services/auth.service';
import { login } from '../../store/auth/authSlice';
import { Link } from 'react-router-dom';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(user);

  const fetchUserProfile = async () => {
    try {
      const profile = await authService.getProfile();
      if (profile) {
        setUserData(profile);
        dispatch(login(profile));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData?.banner);
  

  return (
    <Container maxWidth="xl" component="article" sx={{ mt: 0 }}>
      <Box component="section">
        <CardMedia
          component="img"
          height="350"
          image={`http://localhost:3001/api/static/${userData?.banner}`}
          sx={{
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            mb: 2,
          }}
        />
      </Box>
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'center' },
          alignItems: 'center',
          position: { xs: 'absolute', md: 'relative' },
          top: { xs: 250, sm: 300, md: 0 },
          left: { xs: '50%', md: 0 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
          gap: { xs: 0, md: 4 },
        }}
      >
        <Avatar
          src={`http://localhost:3001/api/static/${userData?.avatar}`}
          sx={{
            width: { xs: 200, sm: 250 },
            height: { xs: 200, sm: 250 },
            m: { xs: 'auto', sm: 0 },
            border: '5px solid white',
          }}
        />

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {userData?.displayname}
          </Typography>

          <Typography variant="body1" paragraph>
            {userData?.email}
          </Typography>

          <Typography variant="body1" paragraph>
            Subscriber 70
          </Typography>
          <AvatarGroup max={8}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'end',
          }}
        >
          <Link to="/upload-banner">
            <Button
              variant="contained"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Upload background image
            </Button>
          </Link>
          <Link to="/upload-avatar">
            <Button
              variant="contained"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Upload avatar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
