import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllFavorites, selectFavorites } from '../../store/favorite/favoriteSlice';
import { favoritesService } from '../../services/favorites.service';
import { Favorites } from '../../components'

const FavoritesList: FC = () => {
const dispatch = useAppDispatch();
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
  }, [dispatch, favorites.length]);

  return (
    <div>
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <Favorites favorite={favorite} />
        </div>
      ))}
    </div>
  );
};


export default FavoritesList;
