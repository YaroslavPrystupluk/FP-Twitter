import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { IUser } from '../types/userTypes';
import { profileService } from '../services/profile.service';
import { Subscribers } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { subscriberService } from '../services/subscribers.service';
import { addSubscribers, deleteSubscriber } from '../store/subscriber/subscriberSlice';

const UserProfile: FC = () => {
    const subscribers = useAppSelector((state) => state.subscriber.subscribers);
  const [userData, setUserData] = useState<IUser | null>(null);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await profileService.getOneProfile(id);
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
  }, [id]);

  const handleToggleSubscribe = async (followingId: string) => {
    try {
      const isSubscribed = subscribers.some(
        (subscriber) => subscriber.following.id === followingId,
      );
      if (isSubscribed) {
        const data = await subscriberService.deleteSubscriber(followingId);
        console.log(data);
        
        dispatch(deleteSubscriber(data));
        toast.success('Subscription removed!');
      } else {
        const newSubscriber = await subscriberService.addSubscriber(
          followingId,
        );
        dispatch(addSubscribers(newSubscriber));
        toast.success('Subscription added!');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

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
          <Subscribers />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'end',
          }}
        >
          <Button
            onClick={() => handleToggleSubscribe(id as string)}
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, textTransform: 'none' }}
            // endIcon={
            //   subscribers.some((sub) => sub.following.id === id) ? (
            //     <PersonRemoveIcon />
            //   ) : (
            //     <PersonAddIcon />
            //   )
            // }
            
          >
            {/* {subscribers.some((sub) => sub.following.id === id as string)
              ? 'Unsubscribe'
              : 'Subscribe'} */}
          </Button>

          <Link to="/message">
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: 2, textTransform: 'none' }}
              endIcon={<SendIcon />}
            >
              Message
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
