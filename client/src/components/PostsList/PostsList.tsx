import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllPosts, selectPosts } from '../../store/posts/postSlice';
import { postsService } from '../../services/posts.service';
import { Post } from '../../components';
import { Box, Typography } from '@mui/material';
import { subscriberService } from '../../services/subscribers.service';

const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await postsService.getAllPosts();

        const postsFromFollowing = await subscriberService.getSubscriberPost();
        console.log('postsFromFollowing', postsFromFollowing);
        
        postsData.push(...postsFromFollowing);

        dispatch(getAllPosts(postsData));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch, posts.length]);

  return (
    <Box component="section">
      {posts.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center', my: 10 }}>
          No posts yet
        </Typography>
      ) : (
        posts.map((post, index) => (
          <div key={index}>
            <Post post={post} />
          </div>
        ))
      )}
    </Box>
  );
};

export default PostsList;
