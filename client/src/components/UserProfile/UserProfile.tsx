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
import { Link, useParams } from 'react-router-dom';
import { IUser } from '../../types/userTypes';
import { profileService } from '../../services/profile.service';
 

const UserProfile: FC = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const { email } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await profileService.getOneProfile(email);
        if (profile) {
          setUserData(profile);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const error = err.response?.data.message;
        toast.error(error.toString());
      }
    };
    fetchUserProfile();
  }, [email]);

 
  return (
    <Container maxWidth="xl" component="article" sx={{ mt: 0 }}>
      <Box component="section">
        <CardMedia
          component="img"
          image={`${import.meta.env.VITE_UPLOAD_FILE}/${userData?.banner}`}
          sx={{
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            mb: 2,
            height: { xs: 200, sm: 250, md: 350 },
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
          top: { xs: 150, sm: 270, md: 0 },
          left: { xs: '50%', md: 0 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
          gap: { xs: 0, md: 4 },
        }}
      >
        <Avatar
          src={`${import.meta.env.VITE_UPLOAD_FILE}/${userData?.avatar}`}
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

          <Typography variant="h5" paragraph>
            {userData?.email}
          </Typography>

          <Typography variant="h6" paragraph>
            Subscriber 70
          </Typography>
          <AvatarGroup
            component="section"
            sx={{ justifyContent: 'start' }}
            max={8}
          >
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
              fullWidth
              variant="contained"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Change banner
            </Button>
          </Link>
          <Link to="/upload-avatar">
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Change avatar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
