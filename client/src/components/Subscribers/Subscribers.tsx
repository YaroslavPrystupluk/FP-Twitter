import { Avatar, AvatarGroup, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { subscriberService } from '../../services/subscribers.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllSubscribers } from '../../store/subscriber/subscriberSlice';

const Subscribers: FC = () => {
  const dispatch = useAppDispatch();
  const subscribers = useAppSelector((state) => state.subscriber.subscribers);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const fetchedSubscribers = await subscriberService.getAllSubscribers();

        if (fetchedSubscribers) {
          dispatch(getAllSubscribers(fetchedSubscribers));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const error = err.response?.data.message;
        toast.error(error.toString());
      }
    };
      fetchFollowers();
  }, [dispatch]);

  return (
    <>
      <Typography variant="h6" paragraph>
        Subscriber {subscribers.length}
      </Typography>
      <AvatarGroup component="section" sx={{ justifyContent: 'start' }} max={8}>
        {subscribers.map((subscriber) => (
          <Avatar
            key={subscriber.id}
            alt={subscriber?.follower.displayname}
            src={`${import.meta.env.VITE_UPLOAD_FILE}/${
              subscriber?.follower.avatar
            }`}
          />
        ))}
      </AvatarGroup>
    </>
  );
};

export default Subscribers;
