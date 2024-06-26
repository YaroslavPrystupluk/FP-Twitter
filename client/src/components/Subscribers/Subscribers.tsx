import { Avatar, AvatarGroup, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { subscriberService } from '../../services/subscribers.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllSubscribers } from '../../store/subscriber/subscriberSlice';
import { useParams } from 'react-router-dom';

const Subscribers: FC = () => {
  const dispatch = useAppDispatch();
  const subscribers = useAppSelector((state) => state.subscriber.subscribers);
  const {id } = useParams();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const fetchedSubscribers = await subscriberService.getAllSubscribers(id as string);
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
  }, [dispatch, id]);

  return (
    <>
      <Typography variant="h6" paragraph>
        Subscriber {subscribers.length}
      </Typography>
      <AvatarGroup component="section" sx={{ justifyContent: 'start' }} max={8}>
        {subscribers.map((subscriber) => (
          <Avatar
            key={subscriber.follower.id}
            alt={subscriber.follower.displayname}
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
