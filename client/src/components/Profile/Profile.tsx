import {
  Avatar,
  Box,
  CardMedia,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import { FC } from 'react';

const Profile: FC = () => {
  return (
    <Container maxWidth="xl" component="article" sx={{ mt: 0 }}>
      <Box component="section">
        <CardMedia
          component="img"
          height="350"
          image="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
          alt="profile"
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
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
          position: { xs: 'absolute', md: 'relative' },
          top: { xs: 250, sm: 300, md: 0 },
          left: { xs: '50%',  md: 0 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
        }}
      >
        <Avatar
          alt="Header Photo"
          src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
          sx={{
            width: { xs: 200, sm: 250 },
            height: {xs: 200, sm: 250},
            m: { xs: 'auto', sm: 0 },
            border: '5px solid white',
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Username
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
