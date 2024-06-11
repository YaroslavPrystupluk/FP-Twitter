import { FC } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Container,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { favoritesService } from '../../services/favorites.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteFavorite, selectFavorites } from '../../store/favorite/favoriteSlice';
import { toast } from 'react-toastify';
import { IFavorite } from '../../types/favoriteType';

interface IProps {
  favorite: IFavorite;
}

const Favorites: FC<IProps> = ({ favorite }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  
  const handleDeleteFavorite = async (postId: string) => {
     try {
      const data = await favoritesService.deleteFavoritePost(postId);
      dispatch(deleteFavorite(data));
      toast.success('Post removed from favorites!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const isFavorite = favorites.some((fav) => fav.post.id === favorite.post.id);

  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          maxWidth: 700,
          margin: '0 auto',
          border: '2px solid #ccc',
          my: 4,
          px: 2,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={`${import.meta.env.VITE_UPLOAD_FILE}/${
                favorite.user.avatar
              }`}
            ></Avatar>
          }
          title={favorite.user.displayname}
          subheader={new Date(favorite.post.createdAt).toLocaleDateString()}
        />
        {favorite.post.image.map((image) => (
          <CardMedia
            key={image}
            sx={{ paddingTop: '10px' }}
            component="img"
            image={`http://localhost:3001/api/uploads/${image}`}
            alt={favorite.user.displayname}
          />
        ))}
        <CardContent>
          <Typography paragraph>{favorite.post.text}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => handleDeleteFavorite(favorite.post.id)}
            color={isFavorite ? 'error' : 'default'}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};
export default Favorites;

