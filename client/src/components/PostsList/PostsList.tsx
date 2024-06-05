import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllPosts, selectPosts } from '../../store/posts/postSlice';
import { postsService } from '../../services/posts.service';
import { Post } from '../../components';

const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const postsData = await postsService.getAllPosts();
      
      dispatch(getAllPosts(postsData));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  fetchPosts();
}, [dispatch, posts.length]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.createdAt}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
