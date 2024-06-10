import React, { FC, useState } from 'react';
import { IPost } from '../../types/postsType';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { postsService } from '../../services/posts.service';
import { favoritesService } from '../../services/favorites.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePost } from '../../store/posts/postSlice';
import { Link } from 'react-router-dom';
import {
  addToFavorites,
  deleteFavorite,
  selectFavorites,
} from '../../store/favorite/favoriteSlice';
import { toast } from 'react-toastify';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async (id: string) => {
    try {
      await postsService.deletePost(id);
      dispatch(deletePost(id));
      toast.success('Post deleted successfully!');

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleToggleLike = async (postId: string) => {
    try {
      const isFavorite = favorites.some(
        (favoritePost) => favoritePost.post.id === postId,
      );
      if (isFavorite) {
        const data = await favoritesService.deleteFavoritePost(postId);
        dispatch(deleteFavorite(data));
        toast.success('Post removed from favorites!');
      } else {
    const newFavorite = await favoritesService.addFavoritePosts(postId);
        dispatch(addToFavorites(newFavorite));
        toast.success('Post added to favorites!');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

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
              src={`${import.meta.env.VITE_UPLOAD_FILE}/${post.user.avatar}`}
            ></Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                style={{ width: '100%' }}
              >
                <Link
                  to={`/posts/update/${post.id}`}
                  state={post}
                  style={{ textDecoration: 'none', color: '#000000dd' }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit post" />
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleDeletePost(post.id);
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete post" />
                </MenuItem>
              </Menu>
            </>
          }
          title={post.user?.displayname}
          subheader={new Date(post.createdAt).toLocaleDateString()}
        />
        {post.image
          ? post.image.map((image) => (
              <CardMedia
                key={image}
                sx={{ paddingTop: '10px' }}
                component="img"
                image={`${import.meta.env.VITE_UPLOAD_FILE}/${image}`}
                alt={image}
              />
            ))
          : null}

        <CardContent>
          <Typography paragraph>{post.text}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => handleToggleLike(post.id)}
            color={
              favorites.some((fav) => fav.post.id === post.id)
                ? 'error'
                : 'default'
            }
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Post;
