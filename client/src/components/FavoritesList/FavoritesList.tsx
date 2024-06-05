import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllPosts, selectPosts } from '../../store/posts/postSlice';
import { postsService } from '../../services/posts.service';
import { getAllFavorites, selectFavorites } from '../../store/favorite/favoriteSlice';
import { favoritesService } from '../../services/favorites.service';
import { Favorites } from '../../pages';

const FavoritesList: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const favorites = useAppSelector(selectFavorites);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await favoritesService.getAllFavoritePosts();

        dispatch(getAllFavorites(postsData));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div>
      {favorites.map((favorite) => (
        <div key={favorite.createdAt}>
          <Favorites favorite={favorite} />
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
