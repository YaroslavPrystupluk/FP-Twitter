import { FC } from 'react';
import { FormAddPosts, PostsList, Profile } from '../components';
import { Box } from '@mui/material';

const FeedPosts: FC = () => {
  return (
    <>
      <Box component="section">
        <Profile />
      </Box>
      <Box component="section" sx={{ mt: { xs: 65, sm: 70, md: 8 } }}>
        <FormAddPosts />
      </Box>
      <Box component="section">
        <PostsList />
      </Box>
    </>
  );
};

export default FeedPosts;
